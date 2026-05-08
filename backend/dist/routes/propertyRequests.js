"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PropertyRequest_1 = __importDefault(require("../models/PropertyRequest"));
const Property_1 = __importDefault(require("../models/Property"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// POST /api/property-requests - Create a new request (authenticated user)
router.post('/', auth_1.authMiddleware, async (req, res) => {
    const { propertyId, userId, userName, userEmail, message } = req.body;
    if (!propertyId || !userId || !userName || !userEmail) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    // Ensure user can only create requests for themselves
    if (userId !== req.user.id) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    try {
        // Check if property exists
        const property = await Property_1.default.findById(propertyId);
        if (!property)
            return res.status(404).json({ message: 'Property not found' });
        // Check if request already exists
        const existing = await PropertyRequest_1.default.findOne({ propertyId, userId });
        if (existing)
            return res.status(400).json({ message: 'Request already exists for this property' });
        const request = new PropertyRequest_1.default({
            propertyId,
            userId,
            userName,
            userEmail,
            message: message || '',
            status: 'pending'
        });
        await request.save();
        res.status(201).json(request);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
// GET /api/property-requests - Get all requests (admin only)
router.get('/', auth_1.authMiddleware, (0, auth_1.requireRole)('admin'), async (req, res) => {
    try {
        const requests = await PropertyRequest_1.default.find()
            .populate('propertyId')
            .populate('userId')
            .sort({ createdAt: -1 });
        res.json(requests);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
// GET /api/property-requests/user/:userId - Get requests for specific user (user or admin)
router.get('/user/:userId', auth_1.authMiddleware, async (req, res) => {
    const { userId } = req.params;
    // Allow user to view their own requests or admin to view any
    if (userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    try {
        const requests = await PropertyRequest_1.default.find({ userId })
            .populate('propertyId')
            .sort({ createdAt: -1 });
        res.json(requests);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
// PATCH /api/property-requests/:id - Update request status (admin only)
router.patch('/:id', auth_1.authMiddleware, (0, auth_1.requireRole)('admin'), async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }
    try {
        const request = await PropertyRequest_1.default.findByIdAndUpdate(id, { status }, { new: true });
        if (!request)
            return res.status(404).json({ message: 'Request not found' });
        res.json(request);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
// DELETE /api/property-requests/:id - Delete request (user or admin)
router.delete('/:id', auth_1.authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const request = await PropertyRequest_1.default.findById(id);
        if (!request)
            return res.status(404).json({ message: 'Request not found' });
        // Allow user to delete their own or admin to delete any
        if (request.userId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        await request.deleteOne();
        res.json({ message: 'Request deleted' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.default = router;
