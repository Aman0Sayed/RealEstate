import express, { Request, Response } from 'express';
import User from '../models/User';
import { authMiddleware, AuthedRequest, requireRole } from '../middleware/auth';
import bcrypt from 'bcrypt';

const router = express.Router();

// GET /api/users/me - get current user's profile
router.get('/me', authMiddleware, async (req: AuthedRequest, res: Response) => {
  try {
    const user = await User.findById(req.user!.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/users/me - update profile (name, phone, password)
router.put('/me', authMiddleware, async (req: AuthedRequest<{ name?: string; phone?: string; password?: string }>, res: Response) => {
  try {
    const updates: any = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.phone) updates.phone = req.body.phone;
    if (req.body.password) updates.password = await bcrypt.hash(req.body.password, 10);

    const user = await User.findByIdAndUpdate(req.user!.id, updates, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: GET /api/users - list all users
router.get('/', authMiddleware, requireRole('admin'), async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: DELETE /api/users/:id
router.delete('/:id', authMiddleware, requireRole('admin'), async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
