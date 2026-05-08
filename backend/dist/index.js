"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const properties_1 = __importDefault(require("./routes/properties"));
const propertyRequests_1 = __importDefault(require("./routes/propertyRequests"));
dotenv_1.default.config();
const requiredEnv = ['MONGODB_URI', 'JWT_SECRET', 'CLIENT_URL'];
for (const envName of requiredEnv) {
    if (!process.env[envName]) {
        console.error(`Missing required environment variable: ${envName}`);
        throw new Error(`Missing required environment variable: ${envName}`);
    }
}
const app = (0, express_1.default)();
const localOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:4173',
    'http://127.0.0.1:4173',
];
const allowedOrigins = new Set([
    process.env.CLIENT_URL,
    ...localOrigins,
].filter(Boolean));
app.use((0, helmet_1.default)({ contentSecurityPolicy: false }));
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.has(origin) ||
            origin.endsWith('.vercel.app') ||
            origin.endsWith('.vercel.sh')) {
            return callback(null, true);
        }
        return callback(new Error('CORS policy does not allow this origin'), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
}));
app.use(express_1.default.json());
app.use((0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
}));
app.get('/', (_req, res) => res.json({ status: 'CloudHome API running' }));
app.use('/api/auth', auth_1.default);
app.use('/api/users', users_1.default);
app.use('/api/properties', properties_1.default);
app.use('/api/property-requests', propertyRequests_1.default);
exports.default = app;
