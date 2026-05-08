"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../middleware/auth");
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
// GET /api/users/me - get current user's profile
router.get('/me', auth_1.authMiddleware, async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
// PUT /api/users/me - update profile (name, phone, password)
router.put('/me', auth_1.authMiddleware, async (req, res) => {
    try {
        const updates = {};
        if (req.body.name)
            updates.name = req.body.name;
        if (req.body.phone)
            updates.phone = req.body.phone;
        if (req.body.password)
            updates.password = await bcrypt_1.default.hash(req.body.password, 10);
        const user = await User_1.default.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Admin: GET /api/users - list all users
router.get('/', auth_1.authMiddleware, (0, auth_1.requireRole)('admin'), async (_req, res) => {
    try {
        const users = await User_1.default.find().select('-password');
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Admin: DELETE /api/users/:id
router.delete('/:id', auth_1.authMiddleware, (0, auth_1.requireRole)('admin'), async (req, res) => {
    try {
        await User_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.default = router;
