import { Router, Request, Response } from 'express';
import { Blog } from '../../models/Blog';

const router = Router();

// GET /api/admin/blogs — get all blogs including unpublished
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, data: blogs });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

// PATCH /api/admin/blogs/:id/toggle-publish
router.patch('/:id/toggle-publish', async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ success: false, message: 'Blog not found' });
      return;
    }

    blog.isPublished = !blog.isPublished;
    if (blog.isPublished && !blog.publishedAt) {
      blog.publishedAt = new Date();
    }
    await blog.save();

    res.json({ success: true, message: `Blog ${blog.isPublished ? 'published' : 'unpublished'}`, data: blog });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

export default router;

