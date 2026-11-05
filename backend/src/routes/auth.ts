import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { Admin } from '../models/Admin';
import { adminAuth, AuthRequest } from '../middleware/auth';
import { isDatabaseConnected } from '../config/database';

const router = Router();
const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts. Try again later.' }
});

// POST /api/auth/admin/login
router.post('/admin/login', adminLoginLimiter, async (req: Request, res: Response): Promise<void> => {
  try {
    if (!isDatabaseConnected()) {
      res.status(503).json({ success: false, message: 'Database connection unavailable.' });
      return;
    }
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password are required' });
      return;
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    if (!admin.isActive) {
      res.status(403).json({ success: false, message: 'Your account has been deactivated' });
      return;
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    admin.lastLogin = new Date();
    await admin.save();

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Welcome back to JEEVAN SHAILI Admin Portal',
      data: {
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          lastLogin: admin.lastLogin
        }
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

// GET /api/auth/admin/me
router.get('/admin/me', adminAuth, async (req: AuthRequest, res: Response): Promise<void> => {
  res.json({
    success: true,
    data: req.admin
  });
});

// POST /api/auth/admin/logout
router.post('/admin/logout', adminAuth, (req: Request, res: Response) => {
  res.json({ success: true, message: 'Successfully logged out' });
});

export default router;
