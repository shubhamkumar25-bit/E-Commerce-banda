import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { Category } from '../models/Category';
import { Product } from '../models/Product';
import { Coupon } from '../models/Coupon';
import { Blog } from '../models/Blog';
import { Review } from '../models/Review';
import { Admin } from '../models/Admin';
import { WebsiteSettings } from '../models/WebsiteSettings';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/giwansally';

async function seed() {
  console.log('Connecting to database for seeding...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB.');

  // 1. Admin
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@giwansally.com').toLowerCase();
  const existingAdmin = await Admin.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const password = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123', 12);
    await Admin.create({
      name: 'GIWANSALLY Founder & Admin',
      email: adminEmail,
      password,
      role: 'superadmin',
      isActive: true
    });
    console.log(`Created Superadmin: ${adminEmail}`);
  }

  // 2. Categories
  await Category.deleteMany({});
  const categories = await Category.insertMany([
    {
      name: 'Ayurvedic Liquid Manjan',
      slug: 'ayurvedic-liquid-manjan',
      description: 'Pure, modern liquid oral formulations infused with authentic time-tested Ayurvedic herbs.',
      image: '/images/products/liquid-manjan-hero.png',
      sortOrder: 1,
      isActive: true
    },
    {
      name: 'Herbal Oral Care',
      slug: 'herbal-oral-care',
      description: 'Gentle, natural solutions for gums, enamel protection, and long-lasting fresh breath.',
      image: '/images/products/herbal-oral-care.png',
      sortOrder: 2,
      isActive: true
    },
    {
      name: 'Combo Packs',
      slug: 'combo-packs',
      description: 'Value collections and wellness kits designed for comprehensive family dental protection.',
      image: '/images/products/combo-packs.png',
      sortOrder: 3,
      isActive: true
    },
    {
      name: 'Special Offers',
      slug: 'special-offers',
      description: 'Exclusive seasonal bundles and introductory offers crafted in Banda, Uttar Pradesh.',
      image: '/images/products/special-offers.png',
      sortOrder: 4,
      isActive: true
    }
  ]);
  console.log(`Created ${categories.length} categories.`);

  // 3. Products
  await Product.deleteMany({});
  const products = await Product.insertMany([
    {
      name: 'GIWANSALLY Ayurvedic Liquid Manjan (Classic 100ml)',
      slug: 'giwansally-ayurvedic-liquid-manjan-classic-100ml',
      shortDescription: 'Our flagship pure herbal liquid manjan formulated with traditional botanical extracts for healthy gums and sparkling teeth.',
      description: 'GIWANSALLY Ayurvedic Liquid Manjan is an innovative breakthrough in herbal dental wellness. Unlike conventional abrasive tooth powders, our concentrated liquid manjan gently reaches deep between teeth and periodontal pockets without abrading enamel. Infused with potent extracts of Babool bark, Clove oil (Laung), Bakul, and Majuphal, this formula helps protect against bleeding gums, strengthens teeth roots, eliminates bad breath, and maintains healthy oral microflora. Crafted with pride in Banda, Uttar Pradesh.',
      category: categories[0]._id,
      images: [
        '/images/products/bottle-hero.png',
        '/images/products/bottle-front.png',
        '/images/products/bottle-botanicals.png',
        '/images/products/bottle-lifestyle.png'
      ],
      price: 299,
      salePrice: 249,
      volume: '100ml',
      stock: 150,
      sku: 'GWS-LM-100',
      isFeatured: true,
      isBestSeller: true,
      isActive: true,
      averageRating: 4.9,
      totalReviews: 28,
      totalSold: 142,
      ingredients: [
        {
          name: 'Laung (Clove Oil)',
          description: 'Renowned in Ayurveda for its natural eugenol content, relieving tooth sensitivity and fighting oral odor.'
        },
        {
          name: 'Babool Bark (Acacia Arabica)',
          description: 'Astringent herb traditionally revered for tightening spongy gums and supporting enamel density.'
        },
        {
          name: 'Bakul (Mimusops Elengi)',
          description: 'Classical Ayurvedic herb cited in Charaka Samhita for strengthening teeth roots.'
        },
        {
          name: 'Majuphal (Quercus Infectoria)',
          description: 'Potent natural astringent that helps reduce gum inflammation and bleeding tendencies.'
        },
        {
          name: 'Pudina Satva (Natural Spearmint Extract)',
          description: 'Imparts lingering herbal freshness and cooling comfort throughout the mouth.'
        }
      ],
      howToUse: 'Pour 5-10 drops of GIWANSALLY Liquid Manjan directly onto your toothbrush or swish in oral cavity for 2 minutes after brushing. Spit out and rinse gently with fresh water. Use twice daily for best results.',
      storage: 'Store in a cool and dry place away from direct sunlight. Tightly seal the dropper cap after every use.',
      manufacturingInfo: 'Crafted & Bottled at GIWANSALLY Herbals, Banda, Uttar Pradesh - 210001, India.',
      expiryInfo: 'Best before 24 months from the date of manufacturing.',
      tags: ['liquid manjan', 'ayurvedic', 'gum care', 'clove', 'oral hygiene', 'banda herbal']
    },
    {
      name: 'GIWANSALLY Liquid Manjan - Gum Defence & Sensitivity Care (100ml)',
      slug: 'giwansally-liquid-manjan-gum-defence-sensitivity-100ml',
      shortDescription: 'Targeted botanical formula enriched with Kantakari, Vajradanti, and Neem for soothing sensitive gums and nerves.',
      description: 'Specially formulated for sensitive gums and tingling nerve endings. GIWANSALLY Gum Defence blends wild-harvested Vajradanti and Neem with cooling camphor and Akarkara to calm gum sensitivity to hot or cold foods while nourishing gum tissue.',
      category: categories[0]._id,
      images: [
        '/images/products/bottle-front.png',
        '/images/products/bottle-botanicals.png',
        '/images/products/bottle-hero.png'
      ],
      price: 349,
      salePrice: 289,
      volume: '100ml',
      stock: 120,
      sku: 'GWS-GD-100',
      isFeatured: true,
      isBestSeller: false,
      isActive: true,
      averageRating: 4.8,
      totalReviews: 19,
      totalSold: 88,
      ingredients: [
        {
          name: 'Vajradanti',
          description: 'Celebrated as "Diamond Teeth" in Sanskrit, providing deep structural reinforcement to tooth enamel.'
        },
        {
          name: 'Neem Extract',
          description: 'Natural purifying botanical that actively defends oral cavity against plaque accumulation.'
        },
        {
          name: 'Akarkara (Anacyclus Pyrethrum)',
          description: 'Stimulates saliva secretion and soothes sensitive dental roots.'
        }
      ],
      howToUse: 'Apply 6-8 drops with soft toothbrush or clean fingertips onto gums. Massage gently for 3 minutes before rinsing.',
      storage: 'Keep in dry cabinet at ambient room temperature.',
      manufacturingInfo: 'GIWANSALLY Herbals, Banda, Uttar Pradesh, India.',
      expiryInfo: 'Best before 24 months from MFD.',
      tags: ['sensitivity', 'vajradanti', 'neem', 'gum defense', 'liquid manjan']
    },
    {
      name: 'GIWANSALLY Herbal Duo - 2x Liquid Manjan Saver Pack',
      slug: 'giwansally-herbal-duo-2x-liquid-manjan-saver-pack',
      shortDescription: 'Two 100ml bottles of GIWANSALLY Classic Liquid Manjan at an exclusive discounted family rate.',
      description: 'Double the natural oral protection with our best-value Duo Pack. Enjoy two 100ml bottles of authentic GIWANSALLY Liquid Manjan, giving your family a 60-day supply of chemical-free, herbal dental care.',
      category: categories[2]._id,
      images: [
        '/images/products/combo-packs.png',
        '/images/products/bottle-hero.png'
      ],
      price: 598,
      salePrice: 449,
      volume: '2 x 100ml',
      stock: 90,
      sku: 'GWS-DUO-200',
      isFeatured: true,
      isBestSeller: true,
      isActive: true,
      averageRating: 5.0,
      totalReviews: 34,
      totalSold: 110,
      ingredients: [
        { name: 'Clove Oil (Laung)', description: 'Toothache & breath defense.' },
        { name: 'Babool Extract', description: 'Gum strengthening.' },
        { name: 'Bakul Bark', description: 'Enamel preservation.' }
      ],
      howToUse: 'Follow standard morning and evening oral care routine with 5-10 drops per application.',
      storage: 'Store in cool ambient environment.',
      manufacturingInfo: 'GIWANSALLY Herbals, Banda, Uttar Pradesh, India.',
      expiryInfo: 'Best before 24 months from MFD.',
      tags: ['combo pack', 'duo pack', 'discount', 'family wellness']
    },
    {
      name: 'GIWANSALLY Royal Ayurvedic Oral Care Kit (3x 100ml + Copper Scraper)',
      slug: 'giwansally-royal-ayurvedic-oral-care-kit',
      shortDescription: 'Complete traditional Ayurvedic oral regimen: 3 Liquid Manjan bottles plus pure Ayurvedic Copper Tongue Cleaner.',
      description: 'The ultimate Ayurvedic dental rejuvenation experience. Includes 3 bottles of GIWANSALLY Liquid Manjan (Classic and Gum Defence formulations) accompanied by an ergonomically designed 100% pure copper tongue cleaner to complete the ancient "Dinacharya" oral detox ritual.',
      category: categories[2]._id,
      images: [
        '/images/products/special-offers.png',
        '/images/products/combo-packs.png'
      ],
      price: 999,
      salePrice: 699,
      volume: '3 x 100ml + Accessory',
      stock: 45,
      sku: 'GWS-KIT-300',
      isFeatured: false,
      isBestSeller: true,
      isActive: true,
      averageRating: 4.9,
      totalReviews: 22,
      totalSold: 76,
      ingredients: [
        { name: 'Full Spectrum Herbal Extract Blend', description: 'Laung, Babool, Vajradanti, Majuphal, Pudina Satva & Akarkara.' }
      ],
      howToUse: 'Clean tongue with copper scraper every morning before swishing with GIWANSALLY Liquid Manjan for 2 minutes.',
      storage: 'Store dry.',
      manufacturingInfo: 'GIWANSALLY Herbals, Banda, Uttar Pradesh, India.',
      expiryInfo: 'Best before 24 months from MFD.',
      tags: ['complete kit', 'copper tongue scraper', 'royal ayurvedic', 'gift box']
    }
  ]);
  console.log(`Created ${products.length} products.`);

  // 4. Coupons
  await Coupon.deleteMany({});
  await Coupon.insertMany([
    {
      code: 'AYURVEDA50',
      type: 'fixed',
      value: 50,
      minOrderValue: 499,
      description: 'Flat ₹50 OFF on orders above ₹499',
      isActive: true
    },
    {
      code: 'FIRSTBUY10',
      type: 'percentage',
      value: 10,
      minOrderValue: 249,
      maxDiscount: 100,
      description: '10% discount on your first Ayurvedic oral care order',
      isActive: true
    },
    {
      code: 'BANDAHERBAL',
      type: 'percentage',
      value: 15,
      minOrderValue: 699,
      maxDiscount: 150,
      description: 'Special 15% festival discount on orders above ₹699',
      isActive: true
    }
  ]);
  console.log('Created sample coupons.');

  // 5. Blogs
  await Blog.deleteMany({});
  await Blog.insertMany([
    {
      title: 'Why Liquid Manjan is Revolutionizing Traditional Ayurvedic Oral Hygiene',
      slug: 'why-liquid-manjan-is-revolutionizing-traditional-oral-hygiene',
      excerpt: 'Discover why switching from coarse dry tooth powders and SLS chemical pastes to an herbal liquid manjan is the healthiest choice for your gums and enamel.',
      content: `For decades, millions in India grew up using dry herbal manjans or powdered dant-manjan. While the medicinal herbs used in classical formulations were remarkably potent, coarse powders can sometimes cause micro-abrasions on delicate tooth enamel over years of vigorous brushing.

### The Innovation of Liquid Manjan
GIWANSALLY Ayurvedic Liquid Manjan solves this exact challenge. By hydro-extracting the active botanical phytonutrients of Clove, Babool, Bakul, and Majuphal into an unctuous, biocompatible liquid base, the medicinal compounds reach microscopic sulcular spaces that powders and stiff pastes miss entirely.

#### Key Advantages:
1. **Zero Micro-Abrasion**: Gentle on tooth enamel and dentin.
2. **Capillary Penetration**: The liquid naturally flows into interdental gaps where food debris and plaque breed.
3. **Concentrated Botanical Bioactivity**: Delivers pure plant essences directly to the gingival margin.
4. **Natural Breath Refreshment**: Pure mint and clove without saccharin, artificial dyes, or sodium lauryl sulfate (SLS).

Transitioning to GIWANSALLY Liquid Manjan is not just an upgrade in dental care — it is a reconnection to the purest form of Ayurvedic wisdom formulated for the contemporary lifestyle.`,
      image: '/images/products/bottle-botanicals.png',
      author: 'Dr. Anand Sharma, BAMS (Ayurveda Consultant)',
      tags: ['Liquid Manjan', 'Ayurveda', 'Enamel Protection', 'Herbal Oral Care'],
      isPublished: true,
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      title: 'The Science Behind Clove (Laung) and Babool in Ancient Indian Dental Care',
      slug: 'science-behind-clove-and-babool-in-ancient-dental-care',
      excerpt: 'Explore the peer-reviewed bioactivity of Eugenol from Clove and Tannins from Babool that make them nature’s undisputed champions for oral health.',
      content: `In the classical treatises of Charaka and Sushruta, the twigs of Babool (Acacia Arabica) and the aromatic buds of Lavanga (Clove) were recognized as the premier guardians of the mouth (Mukha Rogahara).

### The Biochemical Power of Eugenol
Clove oil contains over 70-90% eugenol, an aromatic phenol with documented antimicrobial and analgesic properties. When applied in low concentrated ratios, eugenol disrupts the cell walls of harmful oral bacteria while providing prompt relief from nerve irritation.

### Babool: Nature’s Biological Astringent
Babool bark contains natural catechin gallates and condensed tannins. In oral biology, tannins bind with salivary proteins, creating a protective barrier over inflamed gingiva and tightening periodontal ligaments.

When blended in the synergistic proportions found in GIWANSALLY Liquid Manjan, these two botanicals work symbiotically: Clove pacifies inflammation and bacterial load, while Babool restores gum structural integrity.`,
      image: '/images/products/bottle-lifestyle.png',
      author: 'GIWANSALLY Ayurvedic Research Team',
      tags: ['Clove Oil', 'Babool', 'Herbal Ingredients', 'Oral Health'],
      isPublished: true,
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      title: 'Daily Ayurvedic Morning Ritual: The Step-by-Step Guide to Oral Detoxing',
      slug: 'daily-ayurvedic-morning-ritual-step-by-step-guide-to-oral-detox',
      excerpt: 'Learn the sacred Dinacharya sequence — from tongue scraping (Jihwa Nirlekhana) to Gandusha (herbal swishing) with GIWANSALLY.',
      content: `Ayurveda considers the oral cavity to be the gateway to the entire digestive system. A clean mouth ensures balanced Agni (digestive fire) and prevents the circulation of Ama (toxic metabolic residues).

### The Ideal Morning Oral Dinacharya:
1. **Jihwa Nirlekhana (Tongue Scraping)**: Immediately upon waking, scrape the coating off your tongue from back to front using a pure copper tongue cleaner.
2. **Kavala / Swishing with GIWANSALLY**: Place 8-10 drops of GIWANSALLY Liquid Manjan in your mouth. Gently swish it around teeth and gums for 2-3 minutes.
3. **Gentle Brushing or Gum Massage**: Use a soft-bristled brush or your clean ring finger to massage gums in gentle circular motions.
4. **Lukewarm Water Rinse**: Rinse your mouth with warm water to clear residual herbal extracts.

Practicing this ritual daily revitalizes your gums, protects tooth stability, and leaves your breath naturally fresh for hours.`,
      image: '/images/products/bottle-hero.png',
      author: 'Shubham Gupta, GIWANSALLY Brand Team',
      tags: ['Dinacharya', 'Morning Ritual', 'Oral Detox', 'Banda Ayurveda'],
      isPublished: true,
      publishedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
    }
  ]);
  console.log('Created sample educational blogs.');

  // 6. Reviews
  await Review.deleteMany({});
  await Review.insertMany([
    {
      product: products[0]._id,
      customerName: 'Rajesh V., Lucknow',
      rating: 5,
      title: 'Amazing difference in bleeding gums within 10 days!',
      comment: 'I was hesitant because I had only ever used dry tooth powder or commercial pastes. GIWANSALLY Liquid Manjan is on another level! The clove and babool taste is pure and refreshing, and my gum bleeding completely stopped.',
      isApproved: true,
      isVerifiedPurchase: true
    },
    {
      product: products[0]._id,
      customerName: 'Priya Tiwari, Kanpur',
      rating: 5,
      title: 'Real Ayurvedic quality from Banda',
      comment: 'Proud to see such high grade Ayurvedic manufacturing from Banda. The liquid dropper is so convenient to use and doesn’t make any mess in the bathroom sink. Five stars!',
      isApproved: true,
      isVerifiedPurchase: true
    },
    {
      product: products[0]._id,
      customerName: 'Dr. M. K. Sharma, Allahabad',
      rating: 5,
      title: 'Zero enamel abrasion, highly recommended',
      comment: 'As a health practitioner, I always discourage abrasive gritty tooth powders. This liquid formulation is pure genius. Soothing, gentle, and biologically sound.',
      isApproved: true,
      isVerifiedPurchase: true
    },
    {
      product: products[1]._id,
      customerName: 'Sunita Mishra, Varanasi',
      rating: 5,
      title: 'Sensitivity is so much better',
      comment: 'Cold water used to hurt my front teeth. After using this sensitivity liquid manjan every evening, I feel significant comfort. Will buy the duo pack next time!',
      isApproved: true,
      isVerifiedPurchase: true
    }
  ]);
  console.log('Created sample customer reviews.');

  console.log('✅ Seeding completed successfully!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});

