import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const ENV_MONGODB_URI = process.env.MONGODB_URI;

const MONGO_OPTIONS = {
  dbName: 'cloudhome',
  family: 4,
  connectTimeoutMS: 10000,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  autoIndex: true,
};

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const globalCache = globalThis.mongooseCache ?? { conn: null, promise: null };
if (!globalThis.mongooseCache) globalThis.mongooseCache = globalCache;

async function startInMemoryMongo() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  console.warn('Using in-memory MongoDB for development:', uri);
  return { uri, stop: () => mongod.stop() };
}

export async function connectDb() {
  if (globalCache.conn) {
    return globalCache.conn;
  }

  if (!globalCache.promise) {
    const connectAttempt = async () => {
      const uri = ENV_MONGODB_URI ?? '';

      if (!uri) {
        // If no URI provided, spin up an in-memory server for local dev.
        const mem = await startInMemoryMongo();
        return mongoose.connect(mem.uri, MONGO_OPTIONS);
      }

      try {
        return await mongoose.connect(uri, MONGO_OPTIONS);
      } catch (err) {
        // If local Mongo refuses connection, fall back to in-memory for developer convenience.
        console.warn('Failed to connect to MongoDB at', uri, '— falling back to in-memory MongoDB');
        const mem = await startInMemoryMongo();
        return mongoose.connect(mem.uri, MONGO_OPTIONS);
      }
    };

    globalCache.promise = connectAttempt().then((mongooseInstance) => {
      globalCache.conn = mongooseInstance;
      return mongooseInstance;
    });
  }

  return globalCache.promise;
}
