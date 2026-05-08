import app from '../src/index';
import { connectDb } from '../src/db';

let dbInitPromise: Promise<void> | null = null;

async function ensureDb() {
  if (!dbInitPromise) {
    dbInitPromise = connectDb()
      .then(() => undefined)
      .catch((error) => {
        console.error('Unable to connect to MongoDB', error);
        throw error;
      });
  }
  return dbInitPromise;
}

export default async function handler(req: any, res: any) {
  await ensureDb();
  return app(req, res);
}
