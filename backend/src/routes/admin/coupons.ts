import { Router, Request, Response } from 'express';
import { Coupon } from '../../models/Coupon';

const router = Router();

// GET /api/admin/coupons
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json({ success: true, data: coupons });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

// POST /api/admin/coupons
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const coupon = await Coupon.create({
      ...req.body,
      code: req.body.code.trim().toUpperCase(),
      value: Number(req.body.value),
      minOrderValue: Number(req.body.minOrderValue || 0),
      maxDiscount: req.body.maxDiscount ? Number(req.body.maxDiscount) : undefined,
      usageLimit: req.body.usageLimit ? Number(req.body.usageLimit) : undefined,
      isActive: req.body.isActive === undefined ? true : (req.body.isActive === 'true' || req.body.isActive === true)
    });
    res.status(201).json({ success: true, message: 'Coupon created successfully', data: coupon });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/admin/coupons/:id
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData: any = { ...req.body };
    if (req.body.code) updateData.code = req.body.code.trim().toUpperCase();
    if (req.body.value) updateData.value = Number(req.body.value);
    if (req.body.minOrderValue !== undefined) updateData.minOrderValue = Number(req.body.minOrderValue);
    if (req.body.maxDiscount !== undefined) updateData.maxDiscount = req.body.maxDiscount ? Number(req.body.maxDiscount) : undefined;
    if (req.body.usageLimit !== undefined) updateData.usageLimit = req.body.usageLimit ? Number(req.body.usageLimit) : undefined;
    if (req.body.isActive !== undefined) updateData.isActive = (req.body.isActive === 'true' || req.body.isActive === true);

    const coupon = await Coupon.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!coupon) {
      res.status(404).json({ success: false, message: 'Coupon not found' });
      return;
    }
    res.json({ success: true, message: 'Coupon updated successfully', data: coupon });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/admin/coupons/:id
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) {
      res.status(404).json({ success: false, message: 'Coupon not found' });
      return;
    }
    res.json({ success: true, message: 'Coupon deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

