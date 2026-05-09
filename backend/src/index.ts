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

// Trust the first proxy (Vercel) so Express and express-rate-limit
// correctly read `X-Forwarded-For` and related proxy headers.
app.set('trust proxy', 1);

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
app.use(cors({
  origin: [
    "https://cloudhome.vercel.app",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4173",
    "http://127.0.0.1:4173"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.options("*", cors());
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
