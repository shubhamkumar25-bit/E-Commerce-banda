import { Router, Request, Response } from 'express';
import { Order } from '../../models/Order';
import { Product } from '../../models/Product';
import { Category } from '../../models/Category';

const router = Router();

// GET /api/admin/orders — List & filter orders
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 20, status, paymentStatus, search } = req.query;
    const query: any = {};

    if (status && status !== 'all') {
      query.orderStatus = status;
    }

    if (paymentStatus && paymentStatus !== 'all') {
      query.paymentStatus = paymentStatus;
    }

    if (search) {
      query.$or = [
        { orderId: { $regex: search as string, $options: 'i' } },
        { 'customer.name': { $regex: search as string, $options: 'i' } },
        { 'customer.mobile': { $regex: search as string, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      data: {
        orders,
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

// GET /api/admin/orders/stats — Comprehensive Admin Dashboard KPIs
router.get('/stats', async (req: Request, res: Response): Promise<void> => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    const lowStockProducts = await Product.countDocuments({ stock: { $lte: 10 } });
    const pendingOrders = await Order.countDocuments({ orderStatus: 'placed' });
    const processingOrders = await Order.countDocuments({ orderStatus: { $in: ['confirmed', 'processing'] } });
    const shippedOrders = await Order.countDocuments({ orderStatus: { $in: ['shipped', 'out_for_delivery'] } });
    const deliveredOrders = await Order.countDocuments({ orderStatus: 'delivered' });
    const cancelledOrders = await Order.countDocuments({ orderStatus: 'cancelled' });

    const revenueResult = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$pricing.total' } } }
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    // Recent 10 orders
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(10);

    // Monthly sales graph data (last 6 months)
    const monthlyStats = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          sales: { $sum: '$pricing.total' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 6 },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({
      success: true,
      data: {
        totalOrders,
        totalProducts,
        totalCategories,
        lowStockProducts,
        pendingOrders,
        processingOrders,
        shippedOrders,
        deliveredOrders,
        cancelledOrders,
        totalRevenue,
        recentOrders,
        monthlyStats
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

// GET /api/admin/orders/:id
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product', 'name images volume');
    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found' });
      return;
    }
    res.json({ success: true, data: order });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

// PUT /api/admin/orders/:id/status — Update order status, tracking, courier
router.put('/:id/status', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      orderStatus,
      paymentStatus,
      trackingNumber,
      courierName,
      note,
      estimatedDelivery
    } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found' });
      return;
    }

    if (orderStatus && orderStatus !== order.orderStatus) {
      order.orderStatus = orderStatus;
      order.statusHistory.push({
        status: orderStatus,
        timestamp: new Date(),
        note: note || `Status updated to ${orderStatus} by Admin`
      });
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    if (trackingNumber !== undefined) {
      order.trackingNumber = trackingNumber;
    }

    if (courierName !== undefined) {
      order.courierName = courierName;
    }

    if (estimatedDelivery) {
      order.estimatedDelivery = new Date(estimatedDelivery);
    }

    await order.save();

    res.json({
      success: true,
      message: 'Order status and details updated successfully',
      data: order
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

export default router;
