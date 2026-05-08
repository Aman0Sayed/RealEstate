import express, { Request, Response } from 'express';
import PropertyRequest from '../models/PropertyRequest';
import Property from '../models/Property';
import { authMiddleware, AuthedRequest, requireRole } from '../middleware/auth';

const router = express.Router();

// POST /api/property-requests - Create a new request (authenticated user)
router.post('/', authMiddleware, async (req: AuthedRequest, res: Response) => {
  const { propertyId, userId, userName, userEmail, message } = req.body;
  
  if (!propertyId || !userId || !userName || !userEmail) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Ensure user can only create requests for themselves
  if (userId !== req.user!.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  try {
    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    // Check if request already exists
    const existing = await PropertyRequest.findOne({ propertyId, userId });
    if (existing) return res.status(400).json({ message: 'Request already exists for this property' });

    const request = new PropertyRequest({
      propertyId,
      userId,
      userName,
      userEmail,
      message: message || '',
      status: 'pending'
    });
    
    await request.save();
    res.status(201).json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/property-requests - Get all requests (admin only)
router.get('/', authMiddleware, requireRole('admin'), async (req: AuthedRequest, res: Response) => {
  try {
    const requests = await PropertyRequest.find()
      .populate('propertyId')
      .populate('userId')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/property-requests/user/:userId - Get requests for specific user (user or admin)
router.get('/user/:userId', authMiddleware, async (req: AuthedRequest<{},{ userId: string }>, res: Response) => {
  const { userId } = req.params;

  // Allow user to view their own requests or admin to view any
  if (userId !== req.user!.id && req.user!.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  try {
    const requests = await PropertyRequest.find({ userId })
      .populate('propertyId')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/property-requests/:id - Update request status (admin only)
router.patch('/:id', authMiddleware, requireRole('admin'), async (req: AuthedRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const request = await PropertyRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/property-requests/:id - Delete request (user or admin)
router.delete('/:id', authMiddleware, async (req: AuthedRequest<{},{ id: string }>, res: Response) => {
  const { id } = req.params;

  try {
    const request = await PropertyRequest.findById(id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    // Allow user to delete their own or admin to delete any
    if (request.userId.toString() !== req.user!.id && req.user!.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await request.deleteOne();
    res.json({ message: 'Request deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
