# JEEVAN SHAILI Ayurvedic E-Commerce Platform

JEEVAN SHAILI PVT. LTD. provides Ayurvedic Dant Manjan inspired by traditional Ayurvedic oral care practices.

## Brand

- **Brand**: JEEVAN SHAILI
- **Company**: JEEVAN SHAILI PVT. LTD.
- **Product**: Jeevan Shaili Ayurvedic Dant Manjan
- **Founder**: PUSHPENDRA KUMAR RAJPOOT
- **Developer**: Shubham Kumar Yadav
- **Address**: BANGALIPURA, BANDA, UTTAR PRADESH - 210001, INDIA
- **Phone**: +91 7607033877
- **Email**: jeevanshailipvtltd@gmail.com

## Stack

- React 18, TypeScript, Vite, Tailwind CSS
- Node.js, Express, TypeScript, MongoDB, Mongoose
- JWT authentication and Razorpay/Cash on Delivery checkout

## Development

```bash
npm install
npm run dev:backend
npm run dev:frontend
```

The backend runs on port 5000 and the frontend on port 5173. Configure `backend/.env` before starting the API:

```bash
cp backend/.env.example backend/.env
```

Then replace `MONGODB_URI` with your MongoDB Atlas connection string. Also set a strong `JWT_SECRET`, `ADMIN_PASSWORD`, and live Razorpay credentials for production. `backend/.env` is ignored by Git and must never be committed.

## Supplied product image

The original product photograph is stored at `frontend/public/images/products/jeevan-shaili-dant-manjan.jpg` and is used by the homepage, catalog, product gallery, cart fallback, and admin product form.

## Validation

```bash
npm run build:frontend
npm run build:backend
```

With MongoDB configured, initialize only missing catalog/admin/settings records:

```bash
npm run seed:backend
```
