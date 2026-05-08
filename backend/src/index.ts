import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import propertyRoutes from './routes/properties';
import propertyRequestRoutes from './routes/propertyRequests';

dotenv.config();

const requiredEnv = ['MONGODB_URI', 'JWT_SECRET', 'CLIENT_URL'];
for (const envName of requiredEnv) {
  if (!process.env[envName]) {
    console.error(`Missing required environment variable: ${envName}`);
    throw new Error(`Missing required environment variable: ${envName}`);
  }
}

const app = express();

const localOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
];

const allowedOrigins = new Set([
  process.env.CLIENT_URL,
  ...localOrigins,
].filter(Boolean) as string[]);

app.use(
  helmet({ contentSecurityPolicy: false })
);
app.use(
  cors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.has(origin) ||
        origin.endsWith('.vercel.app') ||
        origin.endsWith('.vercel.sh')
      ) {
        return callback(null, true);
      }
      return callback(new Error('CORS policy does not allow this origin'), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.get('/', (_req: Request, res: Response) =>
  res.json({ status: 'CloudHome API running' })
);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/property-requests', propertyRequestRoutes);

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/properties', propertyRoutes);
app.use('/property-requests', propertyRequestRoutes);

export default app;
