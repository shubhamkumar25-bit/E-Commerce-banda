import { Router, Request, Response } from 'express';
import { ContactMessage } from '../models/ContactMessage';

const router = Router();

// POST /api/contact
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, mobile, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400).json({ success: false, message: 'Please provide name, email, subject, and message' });
      return;
    }

    const contact = await ContactMessage.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      mobile: mobile?.trim(),
      subject: subject.trim(),
      message: message.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out to GIWANSALLY! Our Ayurvedic care team will get back to you shortly.',
      data: contact
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

export default router;

