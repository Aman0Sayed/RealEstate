"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = connectDb;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error('Missing required environment variable: MONGODB_URI');
}
const MONGO_OPTIONS = {
    dbName: 'cloudhome',
    family: 4,
    connectTimeoutMS: 10000,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    autoIndex: true,
};
const globalCache = globalThis.mongooseCache ?? { conn: null, promise: null };
if (!globalThis.mongooseCache)
    globalThis.mongooseCache = globalCache;
async function connectDb() {
    if (globalCache.conn) {
        return globalCache.conn;
    }
    if (!globalCache.promise) {
        globalCache.promise = mongoose_1.default
            .connect(MONGODB_URI, MONGO_OPTIONS)
            .then((mongooseInstance) => {
            globalCache.conn = mongooseInstance;
            return mongooseInstance;
        });
    }
    return globalCache.promise;
}
