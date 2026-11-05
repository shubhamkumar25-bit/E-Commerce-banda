import { Router, Request, Response } from 'express';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { adminAuth } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

// GET /api/categories
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ sortOrder: 1, name: 1 });
    res.json({ success: true, data: categories });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

router.get('/admin/all', adminAuth, async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find().sort({ sortOrder: 1, name: 1 });
    res.json({ success: true, data: categories });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

// POST /api/categories (Admin)
router.post('/', adminAuth, upload.single('image'), async (req: Request, res: Response): Promise<void> => {
  try {
    let image = req.body.image || '';
    if (req.file) {
      image = req.file.path?.startsWith('http') ? req.file.path : `/uploads/${req.file.filename}`;
    }

    const categoryName = req.body.nameEnglish || req.body.name;
    const baseSlug = categoryName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const category = await Category.create({
      name: categoryName,
      nameHindi: req.body.nameHindi || '',
      nameEnglish: req.body.nameEnglish || categoryName,
      slug: baseSlug,
      description: req.body.description || '',
      descriptionHindi: req.body.descriptionHindi || '',
      descriptionEnglish: req.body.descriptionEnglish || req.body.description || '',
      image,
      sortOrder: Number(req.body.sortOrder || 0),
      isActive: req.body.isActive === undefined ? true : (req.body.isActive === 'true' || req.body.isActive === true)
    });

    res.status(201).json({ success: true, message: 'Category created', data: category });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/categories/:id (Admin)
router.put('/:id', adminAuth, upload.single('image'), async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData: any = { ...req.body };
    if (req.body.nameEnglish || req.body.name) {
      updateData.name = req.body.nameEnglish || req.body.name;
      updateData.nameEnglish = req.body.nameEnglish || req.body.name;
    }
    if (req.file) {
      updateData.image = req.file.path?.startsWith('http') ? req.file.path : `/uploads/${req.file.filename}`;
    }

    if (req.body.sortOrder !== undefined) updateData.sortOrder = Number(req.body.sortOrder);
    if (req.body.isActive !== undefined) updateData.isActive = (req.body.isActive === 'true' || req.body.isActive === true);

    const category = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!category) {
      res.status(404).json({ success: false, message: 'Category not found' });
      return;
    }

    res.json({ success: true, message: 'Category updated', data: category });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/categories/:id (Admin)
router.delete('/:id', adminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const productCount = await Product.countDocuments({ category: req.params.id });
    if (productCount > 0) {
      res.status(409).json({
        success: false,
        message: `Category cannot be deleted while ${productCount} product${productCount === 1 ? '' : 's'} are assigned to it. Reassign products first.`
      });
      return;
    }
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      res.status(404).json({ success: false, message: 'Category not found' });
      return;
    }
    res.json({ success: true, message: 'Category deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
