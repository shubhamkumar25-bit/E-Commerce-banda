import { Router, Request, Response } from 'express';
import { Product } from '../../models/Product';

const router = Router();

// GET /api/admin/products
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 20, search, category } = req.query;
    const query: any = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search as string, $options: 'i' } },
        { sku: { $regex: search as string, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      data: {
        products,
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

// GET /api/admin/products/low-stock
router.get('/low-stock', async (req: Request, res: Response): Promise<void> => {
  try {
    const lowStockProducts = await Product.find({ stock: { $lte: 10 } })
      .populate('category', 'name')
      .sort({ stock: 1 });

    res.json({ success: true, data: lowStockProducts });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

// PATCH /api/admin/products/:id/toggle-status
router.patch('/:id/toggle-status', async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    product.isActive = !product.isActive;
    await product.save();

    res.json({
      success: true,
      message: `Product ${product.isActive ? 'activated' : 'deactivated'}`,
      data: product
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

export default router;

