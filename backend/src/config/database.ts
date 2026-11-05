import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { Admin } from '../models/Admin';
import { WebsiteSettings } from '../models/WebsiteSettings';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const isDatabaseConnected = (): boolean => mongoose.connection.readyState === 1;

mongoose.connection.on('disconnected', () => {
  console.error('MongoDB disconnected. Database-backed requests will be unavailable until reconnection.');
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error.message);
});

export const connectDatabase = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    throw new Error('MONGODB_URI is not configured. Copy backend/.env.example to backend/.env and add your MongoDB Atlas connection string.');
  }

  if (isDatabaseConnected()) return;

  console.log('Connecting to MongoDB...');
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    maxPoolSize: 10
  });
  console.log(`MongoDB connected successfully (${mongoose.connection.name})`);

  await initDefaultAdmin();
  await initDefaultSettings();
};

async function initDefaultAdmin() {
  try {
    const email = (process.env.ADMIN_EMAIL || 'jeevanshailipvtltd@gmail.com').toLowerCase();
    const existing = await Admin.findOne({ email });
    if (!existing) {
      const configuredPassword = process.env.ADMIN_PASSWORD?.trim();
      if (!configuredPassword) {
        console.error('Default admin was not created: ADMIN_PASSWORD is required when no admin account exists.');
        return;
      }
      const password = await bcrypt.hash(configuredPassword, 12);
      await Admin.create({
        name: 'JEEVAN SHAILI Admin',
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
      { key: 'brandName', value: 'JEEVAN SHAILI' },
      { key: 'companyName', value: 'JEEVAN SHAILI PVT. LTD.' },
      { key: 'tagline', value: 'प्राकृतिक शुद्धता और प्राचीन ज्ञान से परिपूर्ण स्वास्थ्य का सच्चा साथी!' },
      { key: 'phone', value: '+91 7607033877' },
      { key: 'email', value: 'jeevanshailipvtltd@gmail.com' },
      { key: 'location', value: 'BANGALIPURA, BANDA, UTTAR PRADESH - 210001, INDIA' },
      { key: 'shippingCharge', value: 49 },
      { key: 'freeShippingMinimum', value: 499 },
      { key: 'codEnabled', value: true },
      { key: 'announcementText', value: '🌿 Pure Ayurvedic Oral Care from Banda! Flat ₹50 OFF on orders above ₹499 with code AYURVEDA50 | Free Shipping on Prepaid Orders' },
    ];

    const requiredBrandSettings = new Set(['brandName', 'companyName', 'tagline', 'phone', 'email', 'location']);
    for (const item of defaultSettings) {
      if (requiredBrandSettings.has(item.key)) {
        await WebsiteSettings.findOneAndUpdate({ key: item.key }, item, { upsert: true, new: true });
      } else {
        const exists = await WebsiteSettings.findOne({ key: item.key });
        if (!exists) await WebsiteSettings.create(item);
      }
    }
  } catch (err) {
    console.error('Failed to init settings:', err);
  }

}
