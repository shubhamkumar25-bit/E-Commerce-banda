import { Router, Request, Response } from 'express';
import { WebsiteSettings } from '../../models/WebsiteSettings';

const router = Router();

// GET /api/admin/settings
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const settings = await WebsiteSettings.find();
    const settingsMap: Record<string, any> = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });
    res.json({ success: true, data: settingsMap });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

// POST /api/admin/settings
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { key, value } = req.body;
    if (!key) {
      res.status(400).json({ success: false, message: 'Setting key is required' });
      return;
    }

    const updated = await WebsiteSettings.findOneAndUpdate(
      { key },
      { value },
      { upsert: true, new: true }
    );

    res.json({ success: true, message: 'Setting saved successfully', data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

// POST /api/admin/settings/bulk
router.post('/bulk', async (req: Request, res: Response): Promise<void> => {
  try {
    const settings = req.body;
    const bulkOps = Object.entries(settings).map(([key, value]) => ({
      updateOne: {
        filter: { key },
        update: { value },
        upsert: true
      }
    }));

    if (bulkOps.length > 0) {
      await WebsiteSettings.bulkWrite(bulkOps);
    }

    res.json({ success: true, message: 'Settings saved successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
});

export default router;

