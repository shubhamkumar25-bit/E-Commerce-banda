import { Router, Request, Response } from 'express';
import { Blog } from '../models/Blog';
import { adminAuth } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

// GET /api/blogs
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 9, tag } = req.query;
    const query: any = { isPublished: true };
    if (tag) {
      query.tags = tag;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      data: {
        blogs,
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

// GET /api/blogs/:slug
router.get('/:slug', async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findOne({
      $or: [{ slug: req.params.slug }, { _id: req.params.slug.match(/^[0-9a-fA-F]{24}$/) ? req.params.slug : null }],
      isPublished: true
    });

    if (!blog) {
      res.status(404).json({ success: false, message: 'Article not found' });
      return;
    }

    const recentBlogs = await Blog.find({ _id: { $ne: blog._id }, isPublished: true })
      .sort({ publishedAt: -1 })
      .limit(3);

    res.json({
      success: true,
      data: {
        blog,
        recentBlogs
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

// POST /api/blogs (Admin)
router.post('/', adminAuth, upload.single('image'), async (req: Request, res: Response): Promise<void> => {
  try {
    let image = req.body.image || '';
    if (req.file) {
      image = req.file.path?.startsWith('http') ? req.file.path : `/uploads/${req.file.filename}`;
    }

    const baseSlug = req.body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    let tags = [];
    if (req.body.tags) {
      tags = typeof req.body.tags === 'string'
        ? req.body.tags.split(',').map((t: string) => t.trim())
        : req.body.tags;
    }

    const blog = await Blog.create({
      ...req.body,
      slug: baseSlug,
      image,
      tags,
      isPublished: req.body.isPublished === 'true' || req.body.isPublished === true,
      publishedAt: new Date()
    });

    res.status(201).json({ success: true, message: 'Blog published successfully', data: blog });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/blogs/:id (Admin)
router.put('/:id', adminAuth, upload.single('image'), async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData: any = { ...req.body };
    if (req.file) {
      updateData.image = req.file.path?.startsWith('http') ? req.file.path : `/uploads/${req.file.filename}`;
    }

    if (req.body.tags !== undefined) {
      updateData.tags = typeof req.body.tags === 'string'
        ? req.body.tags.split(',').map((t: string) => t.trim())
        : req.body.tags;
    }

    if (req.body.isPublished !== undefined) {
      updateData.isPublished = req.body.isPublished === 'true' || req.body.isPublished === true;
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!blog) {
      res.status(404).json({ success: false, message: 'Blog not found' });
      return;
    }

    res.json({ success: true, message: 'Blog updated successfully', data: blog });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/blogs/:id (Admin)
router.delete('/:id', adminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      res.status(404).json({ success: false, message: 'Blog not found' });
      return;
    }
    res.json({ success: true, message: 'Blog deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

