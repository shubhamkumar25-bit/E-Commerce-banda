import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin';

export interface AuthRequest extends Request {
  admin?: any;
}

export const adminAuth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ success: false, message: 'Authentication required. No token provided.' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'giwansally_ayurvedic_secret_jwt_key_2026_super_secure';
    const decoded = jwt.verify(token, secret) as any;

    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin || !admin.isActive) {
      res.status(401).json({ success: false, message: 'Admin account not found or deactivated.' });
      return;
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid or expired authentication token.' });
  }
};

