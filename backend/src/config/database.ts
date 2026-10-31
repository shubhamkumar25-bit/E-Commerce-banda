import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin';
import { WebsiteSettings } from '../models/WebsiteSettings';

export const connectDatabase = async (): Promise<void> => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/giwansally';
    console.log(`Connecting to MongoDB...`);
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected successfully');

    // Create default superadmin if not exists
    await initDefaultAdmin();
    // Initialize default website settings
    await initDefaultSettings();
  } catch (error) {
    console.warn('⚠️ MongoDB connection warning (will retry or continue in offline/mock mode if no local server):', error);
  }
};

async function initDefaultAdmin() {
  try {
    const email = (process.env.ADMIN_EMAIL || 'admin@giwansally.com').toLowerCase();
    const existing = await Admin.findOne({ email });
    if (!existing) {
      const password = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123', 12);
      await Admin.create({
        name: 'GIWANSALLY Admin',
        email,
        password,
        role: 'superadmin',
        isActive: true
      });
      console.log(`✅ Default admin created (${email})`);
    }
  } catch (err) {
    console.error('Failed to init admin:', err);
  }
}

async function initDefaultSettings() {
  try {
    const defaultSettings = [
      { key: 'brandName', value: 'GIWANSALLY' },
      { key: 'tagline', value: 'Authentic Ayurvedic Liquid Manjan for Pure Oral Health' },
      { key: 'phone', value: '+91 8840091758' },
      { key: 'email', value: 'shubhamcoder@gmail.com' },
      { key: 'location', value: 'Banda, Uttar Pradesh, India' },
      { key: 'shippingCharge', value: 49 },
      { key: 'freeShippingMinimum', value: 499 },
      { key: 'codEnabled', value: true },
      { key: 'announcementText', value: '🌿 Pure Ayurvedic Oral Care from Banda! Flat ₹50 OFF on orders above ₹499 with code AYURVEDA50 | Free Shipping on Prepaid Orders' },
      { key: 'instagramUrl', value: 'https://instagram.com/giwansally' },
      { key: 'facebookUrl', value: 'https://facebook.com/giwansally' },
      { key: 'youtubeUrl', value: 'https://youtube.com/@giwansally' }
    ];

    for (const item of defaultSettings) {
      const exists = await WebsiteSettings.findOne({ key: item.key });
      if (!exists) {
        await WebsiteSettings.create(item);
      }
    }
  } catch (err) {
    console.error('Failed to init settings:', err);
  }
}

