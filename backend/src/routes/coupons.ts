import { Router, Request, Response } from 'express';
import { Coupon } from '../models/Coupon';

const router = Router();

// POST /api/coupons/validate
router.post('/validate', async (req: Request, res: Response): Promise<void> => {
  try {
    const { code, orderValue } = req.body;

    if (!code) {
      res.status(400).json({ success: false, message: 'Please enter a coupon code' });
      return;
    }

    const coupon = await Coupon.findOne({
      code: code.trim().toUpperCase(),
      isActive: true
    });

    if (!coupon) {
      res.status(404).json({ success: false, message: 'Invalid coupon code. Please check and try again.' });
      return;
    }

    const now = new Date();
    if (coupon.expiryDate && new Date(coupon.expiryDate) < now) {
      res.status(400).json({ success: false, message: 'This coupon code has expired.' });
      return;
    }

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      res.status(400).json({ success: false, message: 'This coupon has reached its maximum usage limit.' });
      return;
    }

    const subtotal = Number(orderValue) || 0;
    if (coupon.minOrderValue && subtotal < coupon.minOrderValue) {
      res.status(400).json({
        success: false,
        message: `This coupon requires a minimum cart value of ₹${coupon.minOrderValue}`
      });
      return;
    }

    let discount = 0;
    if (coupon.type === 'percentage') {
      discount = Math.round((subtotal * coupon.value) / 100);
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else {
      discount = Math.min(coupon.value, subtotal);
    }

    res.json({
      success: true,
      message: `Coupon "${coupon.code}" applied! You saved ₹${discount}`,
      data: {
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        discount,
        description: coupon.description
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error validating coupon' });
  }
});

export default router;

