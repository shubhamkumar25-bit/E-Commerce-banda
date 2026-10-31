import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import categoryRoutes from './routes/categories';
import orderRoutes from './routes/orders';
import paymentRoutes from './routes/payments';
import couponRoutes from './routes/coupons';
import blogRoutes from './routes/blogs';
import reviewRoutes from './routes/reviews';
import contactRoutes from './routes/contact';
import subscriberRoutes from './routes/subscribers';
import adminRoutes from './routes/admin/index';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Security middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5174',
  'http://127.0.0.1:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(null, true); // Dev flexible
  },
  credentials: true
}));

app.use(morgan('dev'));

// Static serving for local uploads directory
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Webhook raw body parser MUST be mounted before express.json()
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    brand: 'GIWANSALLY',
    product: 'Ayurvedic Liquid Manjan',
    location: 'Banda, Uttar Pradesh, India',
    timestamp: new Date().toISOString()
  });
});

// Centralized error handler
app.use(errorHandler);

export default app;

