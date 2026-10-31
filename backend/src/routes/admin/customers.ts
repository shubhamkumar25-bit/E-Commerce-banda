import { Router, Request, Response } from 'express';
import { Order } from '../../models/Order';

const router = Router();

// GET /api/admin/customers
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const matchStage: any = {};

    if (search) {
      matchStage.$or = [
        { 'customer.name': { $regex: search as string, $options: 'i' } },
        { 'customer.mobile': { $regex: search as string, $options: 'i' } },
        { 'customer.email': { $regex: search as string, $options: 'i' } }
      ];
    }

    const customers = await Order.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$customer.mobile',
          name: { $first: '$customer.name' },
          email: { $first: '$customer.email' },
          mobile: { $first: '$customer.mobile' },
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: '$pricing.total' },
          city: { $first: '$shippingAddress.city' },
          state: { $first: '$shippingAddress.state' },
          lastOrderDate: { $max: '$createdAt' }
        }
      },
      { $sort: { lastOrderDate: -1 } },
      { $skip: (Number(page) - 1) * Number(limit) },
      { $limit: Number(limit) }
    ]);

    const totalCount = await Order.distinct('customer.mobile', matchStage);

    res.json({
      success: true,
      data: {
        customers,
        total: totalCount.length,
        page: Number(page),
        pages: Math.ceil(totalCount.length / Number(limit))
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

// GET /api/admin/customers/:mobile/orders
router.get('/:mobile/orders', async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find({ 'customer.mobile': req.params.mobile })
      .sort({ createdAt: -1 });

    res.json({ success: true, data: orders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

export default router;

