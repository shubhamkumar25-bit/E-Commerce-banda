# 🌿 GIWANSALLY – Premium Ayurvedic Liquid Manjan E-Commerce Platform

> Authentic Ayurvedic Oral Care crafted in **Banda, Uttar Pradesh, India**.  
> Complete full-stack production application featuring Liquid Manjan product mockups, 1-step guest checkout, Razorpay payment gateway integration, Cash on Delivery (COD), order tracking, and an administrative CMS.

---

## 🏛️ Brand Details & Identity
- **Brand Name**: GIWANSALLY
- **Main Product**: GIWANSALLY Ayurvedic Liquid Manjan (100ml)
- **Category**: Ayurvedic Oral Care (Zero-Abrasion Liquid Formulation)
- **Location**: Banda, Uttar Pradesh - 210001, India
- **Helpline Phone**: +91 8840091758
- **Email**: shubhamcoder@gmail.com
- **Brand Color Palette**:
  - Forest Green: `#174D35`
  - Dark Green: `#103A29`
  - Cream: `#F8F4E9`
  - White: `#FFFFFF`
  - Golden: `#C7A45B`
  - Light Green: `#E9F0E7`

---

## ⚡ Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Ayurvedic Typography (`Cinzel` & `Plus Jakarta Sans`)
- **Icons**: Lucide Icons
- **State & Context**: CartContext (persisted guest cart) + AuthContext
- **Effects**: canvas-confetti celebration on order confirmation

### Backend
- **Server**: Node.js + Express.js + TypeScript
- **Database**: MongoDB + Mongoose ODM
- **Authentication**: JWT + Bcrypt password hashing
- **Payments**: Official Razorpay SDK with HMAC SHA256 server signature verification & webhook listener
- **File Uploads**: Multer with Cloudinary integration & local disk storage fallback
- **Security**: Helmet, CORS, Express-Rate-Limit, Express-Validator

---

## 🚀 Quick Start Guide

### 1. Start the Backend API (Port 5000)
```bash
cd backend
npm run dev
```
*(Runs on `http://localhost:5000`)*

### 2. Start the Frontend Storefront (Port 5173)
```bash
cd frontend
npm run dev
```
*(Runs on `http://localhost:5173`)*

---

## 🔐 Admin Dashboard Credentials

- **Admin Login URL**: `http://localhost:5173/admin/login`
- **Default Email**: `admin@giwansally.com`
- **Default Password**: `Admin@123`

The default admin account is automatically seeded into MongoDB on first server start.

---

## 📦 Features Implemented

1. **Liquid Manjan Branding & Realistic Visual Mockups**:
   - 8 custom SVG packaging mockups and photography representations located in `frontend/public/images/products/`:
     - `bottle-hero.png`: 3D dropper bottle mockup with gold foil collar & emerald glass.
     - `bottle-front.png`: Crisp front label with verified botanical ingredients.
     - `bottle-botanicals.png`: Product surrounded by Clove (Laung), Babool, Bakul & Spearmint.
     - `bottle-lifestyle.png`: Ayurvedic Dinacharya morning vanity ritual with pure copper tongue cleaner.
     - `combo-packs.png`: 2x Duo saver kit.
     - `special-offers.png`: 3x Royal oral care kit with free copper scraper.
     - `liquid-manjan-hero.png`: Liquid drop demonstration emphasizing zero micro-abrasion.
     - `herbal-oral-care.png`: Range shot highlighting oral defense botanicals.

2. **Storefront & Product Catalog**:
   - Dynamic product search, category filtering, and sorting (price, popularity, ratings).
   - Quantity selector, in-stock indicators, discount tags, and volume badges.
   - Interactive Delivery PIN Code checker with instant timeline estimation (2-3 days for UP, 4-5 days for rest of India).

3. **1-Step Guest Checkout (No Mandatory Registration)**:
   - Full Name, 10-digit Mobile Number, delivery address, optional landmark, and delivery instructions.
   - Validates stock and pricing from MongoDB on the server before creating orders.
   - Generates unique Order IDs: `GWS-YYMMDD-XXXX`.

4. **Razorpay & Cash on Delivery (COD)**:
   - Razorpay orders created on backend with official currency (`INR`) in paise.
   - Server-side signature verification using `crypto.createHmac('sha256', secret)`.
   - Webhook listener configured for `payment.captured` and `payment.failed`.
   - Full support for Cash on Delivery.

5. **Track My Order**:
   - Customers track orders using `Order ID` + `Mobile Number` verification.
   - Visual 6-step progress timeline: `Placed` → `Confirmed` → `Processing` → `Shipped` → `Out for Delivery` → `Delivered`.
   - Shows assigned courier partner and AWB tracking numbers.

6. **Comprehensive Admin CMS**:
   - **Dashboard**: Revenue, order KPIs, pending dispatch alerts, low stock alerts.
   - **Products**: Add, edit, delete, toggle active status, manage stock and ingredients.
   - **Orders**: Filter by status, update courier & tracking numbers, manage COD payments.
   - **Customers**: Aggregated buyer purchase history and location data.
   - **Coupons**: Percentage and fixed discount codes (e.g., `AYURVEDA50`, `FIRSTBUY10`).
   - **Reviews**: Customer review moderation (approve/reject).
   - **Blogs**: Ayurvedic educational article publisher.
   - **Settings**: Manage store contact info, shipping charges, free shipping threshold, and COD toggle.

---

## ⚙️ Environment Variables Reference

Located in `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/giwansally
JWT_SECRET=giwansally_ayurvedic_secret_jwt_key_2026_super_secure
ADMIN_EMAIL=admin@giwansally.com
ADMIN_PASSWORD=Admin@123
RAZORPAY_KEY_ID=rzp_test_placeholder_key
RAZORPAY_KEY_SECRET=placeholder_secret_key
RAZORPAY_WEBHOOK_SECRET=placeholder_webhook_secret
CLOUDINARY_CLOUD_NAME=placeholder_cloud_name
CLOUDINARY_API_KEY=placeholder_api_key
CLOUDINARY_API_SECRET=placeholder_api_secret
FRONTEND_URL=http://localhost:5173
```

---

## 🚢 Deployment Guidelines

- **Frontend**: Deploy to **Vercel** with build command `npm run build` and output directory `dist`.
- **Backend**: Deploy to **Render** or **Railway** with start command `npm start` (or `node dist/index.js`).
- **Database**: Connect to **MongoDB Atlas**.
- **Images**: Store in **Cloudinary** by providing valid credentials in `.env`.

