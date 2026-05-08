"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Property_1 = __importDefault(require("../models/Property"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// GET /api/properties - list properties (public)
router.get('/', async (_req, res) => {
    try {
        const props = await Property_1.default.find().populate('owner', 'name email phone');
        res.json(props);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
// GET /api/properties/:id - get property detail
router.get('/:id', async (req, res) => {
    try {
        const prop = await Property_1.default.findById(req.params.id).populate('owner', 'name email phone');
        if (!prop)
            return res.status(404).json({ message: 'Not found' });
        res.json(prop);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
// POST /api/properties - create property (admin only)
router.post('/', auth_1.authMiddleware, (0, auth_1.requireRole)('admin'), async (req, res) => {
    try {
        const data = req.body;
        const prop = new Property_1.default({ ...data, owner: req.user.id });
        await prop.save();
        res.status(201).json(prop);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
// PUT /api/properties/:id - update property (admin only)
router.put('/:id', auth_1.authMiddleware, (0, auth_1.requireRole)('admin'), async (req, res) => {
    try {
        const prop = await Property_1.default.findById(req.params.id);
        if (!prop)
            return res.status(404).json({ message: 'Not found' });
        Object.assign(prop, req.body);
        await prop.save();
        res.json(prop);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
// DELETE /api/properties/:id - delete (admin only)
router.delete('/:id', auth_1.authMiddleware, (0, auth_1.requireRole)('admin'), async (req, res) => {
    try {
        const prop = await Property_1.default.findById(req.params.id);
        if (!prop)
            return res.status(404).json({ message: 'Not found' });
        await prop.deleteOne();
        res.json({ message: 'Deleted' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.default = router;
