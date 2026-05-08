"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
// POST /api/auth/register
// Body: { name, email, password }
// Registers a new user (always as 'user' role)
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({ message: 'Missing fields' });
    try {
        const existing = await User_1.default.findOne({ email });
        if (existing)
            return res.status(400).json({ message: 'Email already in use' });
        const hashed = await bcrypt_1.default.hash(password, 10);
        const user = new User_1.default({ name, email, password: hashed, role: 'user' });
        await user.save();
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error('Missing JWT_SECRET environment variable');
            return res.status(500).json({ message: 'Server misconfiguration' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, secret, { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
// POST /api/auth/login
// Body: { email, password }
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: 'Missing fields' });
    try {
        const user = await User_1.default.findOne({ email });
        if (!user)
            return res.status(400).json({ message: 'Invalid credentials' });
        const match = await bcrypt_1.default.compare(password, user.password);
        if (!match)
            return res.status(400).json({ message: 'Invalid credentials' });
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error('Missing JWT_SECRET environment variable');
            return res.status(500).json({ message: 'Server misconfiguration' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, secret, { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.default = router;
