import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcryptjs';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { Admin } from '../models/Admin';
import { WebsiteSettings } from '../models/WebsiteSettings';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;
const PRODUCT_IMAGE = '/images/products/jeevan-shaili-dant-manjan.jpg';

async function seed() {
  if (!MONGODB_URI) throw new Error('MONGODB_URI is required to seed the database.');
  await mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 10
  });

  const adminEmail = (process.env.ADMIN_EMAIL || 'jeevanshailipvtltd@gmail.com').toLowerCase();
  const existingAdmin = await Admin.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const adminPassword = process.env.ADMIN_PASSWORD?.trim();
    if (!adminPassword) {
      throw new Error('ADMIN_PASSWORD is required to create the initial admin account.');
    }
    await Admin.create({
      name: 'JEEVAN SHAILI Admin',
      email: adminEmail,
      password: await bcrypt.hash(adminPassword, 12),
      role: 'superadmin',
      isActive: true
    });
  }

  let category = await Category.findOne({ slug: 'ayurvedic-oral-care' });
  if (!category) {
    category = await Category.create({
      name: 'Ayurvedic Oral Care',
      slug: 'ayurvedic-oral-care',
      description: 'Traditional Ayurvedic-inspired oral care products.',
      image: PRODUCT_IMAGE,
      sortOrder: 1,
      isActive: true
    });
  }

  const existingProduct = await Product.findOne({ slug: 'jeevan-shaili-ayurvedic-dant-manjan' });
  if (!existingProduct) {
    await Product.create({
      name: 'Jeevan Shaili Ayurvedic Dant Manjan',
      slug: 'jeevan-shaili-ayurvedic-dant-manjan',
      shortDescription: 'Herbal tooth powder inspired by traditional Ayurvedic oral care practices.',
      description: 'Jeevan Shaili Ayurvedic Dant Manjan is inspired by traditional Ayurvedic oral care practices. Make it a part of your daily oral care routine. Display the actual ingredients, usage instructions and product information according to the product packaging.',
      category: category._id,
      images: [PRODUCT_IMAGE],
      price: 299,
      salePrice: 249,
      volume: 'Tooth powder',
      stock: 150,
      sku: 'JS-DM-001',
      isFeatured: true,
      isBestSeller: true,
      isActive: true,
      ingredients: [],
      howToUse: 'Use according to the instructions on the product packaging.',
      storage: '',
      manufacturingInfo: '',
      expiryInfo: '',
      tags: ['ayurvedic', 'dant manjan', 'tooth powder', 'oral care']
    });
  }

  const settings = [
    ['brandName', 'JEEVAN SHAILI'],
    ['companyName', 'JEEVAN SHAILI PVT. LTD.'],
    ['tagline', 'प्राकृतिक शुद्धता और प्राचीन ज्ञान से परिपूर्ण स्वास्थ्य का सच्चा साथी!'],
    ['phone', '+91 7607033877'],
    ['email', 'jeevanshailipvtltd@gmail.com'],
    ['location', 'BANGALIPURA, BANDA, UTTAR PRADESH - 210001, INDIA'],
    ['codEnabled', true]
  ] as const;
  for (const [key, value] of settings) {
    await WebsiteSettings.findOneAndUpdate({ key }, { key, value }, { upsert: true, new: true });
  }

  await mongoose.disconnect();
  console.log('JEEVAN SHAILI database seed completed.');
}

seed().catch(async (error) => {
  console.error('Seed failed:', error);
  await mongoose.disconnect();
  process.exitCode = 1;
});
