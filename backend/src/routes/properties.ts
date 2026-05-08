import express, { Request, Response } from 'express';
import Property from '../models/Property';
import { authMiddleware, AuthedRequest, requireRole } from '../middleware/auth';

const router = express.Router();

// GET /api/properties - list properties (public)
router.get('/', async (_req: Request, res: Response) => {
  try {
    const props = await Property.find().populate('owner', 'name email phone');
    res.json(props);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/properties/:id - get property detail
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const prop = await Property.findById(req.params.id).populate('owner', 'name email phone');
    if (!prop) return res.status(404).json({ message: 'Not found' });
    res.json(prop);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/properties - create property (admin only)
router.post('/', authMiddleware, requireRole('admin'), async (req: AuthedRequest<any>, res: Response) => {
  try {
    const data = req.body;
    const prop = new Property({ ...data, owner: req.user!.id });
    await prop.save();
    res.status(201).json(prop);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/properties/:id - update property (admin only)
router.put('/:id', authMiddleware, requireRole('admin'), async (req: AuthedRequest<any, { id: string }>, res: Response) => {
  try {
    const prop = await Property.findById(req.params.id);
    if (!prop) return res.status(404).json({ message: 'Not found' });

    Object.assign(prop, req.body);
    await prop.save();
    res.json(prop);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/properties/:id - delete (admin only)
router.delete('/:id', authMiddleware, requireRole('admin'), async (req: AuthedRequest<{},{ id: string }>, res: Response) => {
  try {
    const prop = await Property.findById(req.params.id);
    if (!prop) return res.status(404).json({ message: 'Not found' });
    await prop.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
