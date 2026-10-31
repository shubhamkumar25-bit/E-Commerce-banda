import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/Layout';

// Public Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { TrackOrder } from './pages/TrackOrder';
import { AboutUs } from './pages/AboutUs';
import { OurStory } from './pages/OurStory';
import { BlogPage } from './pages/Blog';
import { BlogDetails } from './pages/BlogDetails';
import { ContactUs } from './pages/ContactUs';
import { FAQ } from './pages/FAQ';

// Policy Pages
import { PrivacyPolicy } from './pages/policies/PrivacyPolicy';
import { ShippingPolicy } from './pages/policies/ShippingPolicy';
import { ReturnPolicy } from './pages/policies/ReturnPolicy';
import { TermsConditions } from './pages/policies/TermsConditions';

// Admin CMS Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminCustomers } from './pages/admin/AdminCustomers';
import { AdminCoupons } from './pages/admin/AdminCoupons';
import { AdminBlogs } from './pages/admin/AdminBlogs';
import { AdminReviews } from './pages/admin/AdminReviews';
import { AdminSettings } from './pages/admin/AdminSettings';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Storefront Routes with Header and Footer */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="product/:slug" element={<ProductDetails />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="order-success/:orderId" element={<OrderSuccess />} />
              <Route path="track-order" element={<TrackOrder />} />
              <Route path="about-us" element={<AboutUs />} />
              <Route path="our-story" element={<OurStory />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/:slug" element={<BlogDetails />} />
              <Route path="contact" element={<ContactUs />} />
              <Route path="faq" element={<FAQ />} />
              
              {/* Policies */}
              <Route path="policies/privacy" element={<PrivacyPolicy />} />
              <Route path="policies/shipping" element={<ShippingPolicy />} />
              <Route path="policies/refund" element={<ReturnPolicy />} />
              <Route path="policies/terms" element={<TermsConditions />} />
            </Route>

            {/* Admin Login */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin CMS Layout & Subroutes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="coupons" element={<AdminCoupons />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Fallback 404 Catch-All */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;

