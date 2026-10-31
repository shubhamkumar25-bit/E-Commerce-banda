import { Router, Request, Response } from 'express';
import { Review } from '../models/Review';
import { Product } from '../models/Product';
import { adminAuth } from '../middleware/auth';

const router = Router();

// GET /api/reviews/:productId
router.get('/:productId', async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
      isApproved: true
    }).sort({ createdAt: -1 });

    res.json({ success: true, data: reviews });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

// POST /api/reviews — Customer submit review
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, customerName, customerMobile, rating, title, comment } = req.body;

    if (!productId || !customerName || !rating || !comment) {
      res.status(400).json({ success: false, message: 'Please provide all required review fields' });
      return;
    }

    const review = await Review.create({
      product: productId,
      customerName: customerName.trim(),
      customerMobile: customerMobile ? customerMobile.trim() : undefined,
      rating: Number(rating),
      title: title?.trim(),
      comment: comment.trim(),
      isApproved: false, // Moderated by default
      isVerifiedPurchase: false
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your feedback! Your review has been submitted for moderation.',
      data: review
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PATCH /api/reviews/:id/approve (Admin)
router.patch('/:id/approve', adminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    if (!review) {
      res.status(404).json({ success: false, message: 'Review not found' });
      return;
    }

    // Recalculate product rating
    const approvedReviews = await Review.find({ product: review.product, isApproved: true });
    const avg = approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length;

    await Product.findByIdAndUpdate(review.product, {
      averageRating: Math.round(avg * 10) / 10,
      totalReviews: approvedReviews.length
    });

    res.json({ success: true, message: 'Review approved', data: review });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/reviews/:id (Admin)
router.delete('/:id', adminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      res.status(404).json({ success: false, message: 'Review not found' });
      return;
    }

    // Recalculate product rating
    const approvedReviews = await Review.find({ product: review.product, isApproved: true });
    const avg = approvedReviews.length > 0
      ? approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length
      : 5;

    await Product.findByIdAndUpdate(review.product, {
      averageRating: Math.round(avg * 10) / 10,
      totalReviews: approvedReviews.length
    });

    res.json({ success: true, message: 'Review removed' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

