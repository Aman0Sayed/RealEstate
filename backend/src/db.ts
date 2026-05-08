import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Missing required environment variable: MONGODB_URI');
}

const MONGO_OPTIONS = {
  dbName: 'Project_1',
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

export async function connectDb() {
  if (globalCache.conn) {
    return globalCache.conn;
  }

  if (!globalCache.promise) {
    globalCache.promise = mongoose
      .connect(MONGODB_URI, MONGO_OPTIONS)
      .then((mongooseInstance) => {
        globalCache.conn = mongooseInstance;
        return mongooseInstance;
      });
  }

  return globalCache.promise;
}
