import { Router, Request, Response } from 'express';
import { Review } from '../../models/Review';

const router = Router();

// GET /api/admin/reviews — all reviews with filter
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.query;
    const query: any = {};

    if (status === 'pending') query.isApproved = false;
    if (status === 'approved') query.isApproved = true;

    const reviews = await Review.find(query)
      .populate('product', 'name slug images')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: reviews });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

export default router;

