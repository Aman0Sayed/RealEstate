import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

// POST /api/auth/register
// Body: { name, email, password }
// Registers a new user (always as 'user' role)
router.post('/register', async (req: Request, res: Response) => {
  const { name, email, password } = req.body as any;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role: 'user' });
    await user.save();

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('Missing JWT_SECRET environment variable');
      return res.status(500).json({ message: 'Server misconfiguration' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/login
// Body: { email, password }
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body as any;
  if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('Missing JWT_SECRET environment variable');
      return res.status(500).json({ message: 'Server misconfiguration' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: '7d' });
    
    // Clear all existing sessions and add new session (single session model)
    user.activeSessions = [{ token, createdAt: new Date() }];
    await user.save();
    
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/logout
// Requires auth header
router.post('/logout', async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization as string | undefined;
  if (!authHeader) return res.status(401).json({ message: 'Missing auth header' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Invalid auth header' });

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('Missing JWT_SECRET environment variable');
      return res.status(500).json({ message: 'Server misconfiguration' });
    }

    const payload = jwt.verify(token, secret) as { id: string };
    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    // Remove session from active sessions
    user.activeSessions = user.activeSessions.filter(session => session.token !== token);
    await user.save();

    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
