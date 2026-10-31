import { Router, Request, Response } from 'express';
import { Subscriber } from '../models/Subscriber';

const router = Router();

// POST /api/subscribers
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      res.status(400).json({ success: false, message: 'Valid email address is required' });
      return;
    }

    const existing = await Subscriber.findOne({ email: email.trim().toLowerCase() });
    if (existing) {
      res.json({
        success: true,
        message: 'You are already subscribed to GIWANSALLY herbal health newsletters!'
      });
      return;
    }

    await Subscriber.create({ email: email.trim().toLowerCase() });

    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing to GIWANSALLY Ayurvedic wellness updates!'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

export default router;

