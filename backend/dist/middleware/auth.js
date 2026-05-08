"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
exports.requireRole = requireRole;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ message: 'Missing auth header' });
    const token = authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Invalid auth header' });
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error('Missing JWT_SECRET environment variable');
        return res.status(500).json({ message: 'Server misconfiguration' });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, secret);
        req.user = payload;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
exports.authMiddleware = authMiddleware;
function requireRole(...roles) {
    return (req, res, next) => {
        if (!req.user)
            return res.status(401).json({ message: 'Not authenticated' });
        if (req.user.role === 'admin')
            return next();
        if (roles.includes(req.user.role))
            return next();
        return res.status(403).json({ message: 'Forbidden' });
    };
}
