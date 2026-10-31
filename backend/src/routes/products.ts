import { Router, Request, Response } from 'express';
import { Product } from '../models/Product';
import { adminAuth } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

// Helper to get image path from multer file
const getFilePath = (file: any) => {
  if (file.path && (file.path.startsWith('http://') || file.path.startsWith('https://'))) {
    return file.path;
  }
  return `/uploads/${file.filename}`;
};

// GET /api/products
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      category,
      search,
      sort,
      featured,
      bestseller,
      minPrice,
      maxPrice,
      page = 1,
      limit = 12
    } = req.query;

    const query: any = { isActive: true };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (bestseller === 'true') {
      query.isBestSeller = true;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search as string, $options: 'i' } },
        { shortDescription: { $regex: search as string, $options: 'i' } },
        { tags: { $in: [new RegExp(search as string, 'i')] } }
      ];
    }

    let sortObj: any = { createdAt: -1 };
    if (sort === 'price_asc') sortObj = { price: 1 };
    if (sort === 'price_desc') sortObj = { price: -1 };
    if (sort === 'popular') sortObj = { totalSold: -1 };
    if (sort === 'rating') sortObj = { averageRating: -1 };
    if (sort === 'newest') sortObj = { createdAt: -1 };

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort(sortObj)
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

// GET /api/products/:slug
router.get('/:slug', async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findOne({
      $or: [{ slug: req.params.slug }, { _id: req.params.slug.match(/^[0-9a-fA-F]{24}$/) ? req.params.slug : null }],
      isActive: true
    }).populate('category', 'name slug');

    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    // Related products in the same category
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      isActive: true
    }).limit(4);

    res.json({
      success: true,
      data: {
        product,
        relatedProducts
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

// POST /api/products (Admin)
router.post('/', adminAuth, upload.array('images', 8), async (req: Request, res: Response): Promise<void> => {
  try {
    const files = (req.files as any[]) || [];
    const uploadedImages = files.map(getFilePath);

    let images = uploadedImages;
    if (req.body.imageUrl) {
      images = [req.body.imageUrl, ...uploadedImages];
    } else if (req.body.images && Array.isArray(req.body.images)) {
      images = [...req.body.images, ...uploadedImages];
    }

    let ingredients = [];
    if (req.body.ingredients) {
      try {
        ingredients = typeof req.body.ingredients === 'string'
          ? JSON.parse(req.body.ingredients)
          : req.body.ingredients;
      } catch (e) {
        ingredients = [];
      }
    }

    let tags = [];
    if (req.body.tags) {
      tags = typeof req.body.tags === 'string'
        ? req.body.tags.split(',').map((t: string) => t.trim())
        : req.body.tags;
    }

    const baseSlug = req.body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    let slug = baseSlug;
    let counter = 1;
    while (await Product.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const product = await Product.create({
      ...req.body,
      slug,
      images,
      ingredients,
      tags,
      price: Number(req.body.price),
      salePrice: req.body.salePrice ? Number(req.body.salePrice) : undefined,
      stock: Number(req.body.stock || 0),
      isFeatured: req.body.isFeatured === 'true' || req.body.isFeatured === true,
      isBestSeller: req.body.isBestSeller === 'true' || req.body.isBestSeller === true,
      isActive: req.body.isActive === undefined ? true : (req.body.isActive === 'true' || req.body.isActive === true)
    });

    res.status(201).json({ success: true, message: 'Product created successfully', data: product });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/products/:id (Admin)
router.put('/:id', adminAuth, upload.array('images', 8), async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    const files = (req.files as any[]) || [];
    const newImages = files.map(getFilePath);

    let existingImages = product.images;
    if (req.body.keepImages) {
      try {
        existingImages = typeof req.body.keepImages === 'string'
          ? JSON.parse(req.body.keepImages)
          : req.body.keepImages;
      } catch {}
    }

    let ingredients = product.ingredients;
    if (req.body.ingredients) {
      try {
        ingredients = typeof req.body.ingredients === 'string'
          ? JSON.parse(req.body.ingredients)
          : req.body.ingredients;
      } catch {}
    }

    let tags = product.tags;
    if (req.body.tags !== undefined) {
      tags = typeof req.body.tags === 'string'
        ? req.body.tags.split(',').map((t: string) => t.trim())
        : req.body.tags;
    }

    const updateData: any = {
      ...req.body,
      images: [...existingImages, ...newImages],
      ingredients,
      tags
    };

    if (req.body.price !== undefined) updateData.price = Number(req.body.price);
    if (req.body.salePrice !== undefined) updateData.salePrice = req.body.salePrice ? Number(req.body.salePrice) : undefined;
    if (req.body.stock !== undefined) updateData.stock = Number(req.body.stock);
    if (req.body.isFeatured !== undefined) updateData.isFeatured = req.body.isFeatured === 'true' || req.body.isFeatured === true;
    if (req.body.isBestSeller !== undefined) updateData.isBestSeller = req.body.isBestSeller === 'true' || req.body.isBestSeller === true;
    if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive === 'true' || req.body.isActive === true;

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ success: true, message: 'Product updated successfully', data: updated });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/products/:id (Admin)
router.delete('/:id', adminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

