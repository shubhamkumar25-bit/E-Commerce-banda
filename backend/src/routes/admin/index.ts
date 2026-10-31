import { Router } from 'express';
import { adminAuth } from '../../middleware/auth';
import adminOrdersRouter from './orders';
import adminProductsRouter from './products';
import adminCustomersRouter from './customers';
import adminCouponsRouter from './coupons';
import adminBlogsRouter from './blogs';
import adminReviewsRouter from './reviews';
import adminSettingsRouter from './settings';

const router = Router();

// Protect all admin endpoints with adminAuth
router.use(adminAuth);

router.use('/orders', adminOrdersRouter);
router.use('/products', adminProductsRouter);
router.use('/customers', adminCustomersRouter);
router.use('/coupons', adminCouponsRouter);
router.use('/blogs', adminBlogsRouter);
router.use('/reviews', adminReviewsRouter);
router.use('/settings', adminSettingsRouter);

export default router;

