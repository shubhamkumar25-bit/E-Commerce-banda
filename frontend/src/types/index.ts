export interface Product {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: {
    _id: string;
    name: string;
    slug: string;
  } | string;
  images: string[];
  price: number;
  salePrice?: number;
  volume: string;
  ingredients: {
    name: string;
    description?: string;
    image?: string;
  }[];
  howToUse: string;
  storage?: string;
  manufacturingInfo?: string;
  expiryInfo?: string;
  stock: number;
  sku?: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  isActive: boolean;
  tags: string[];
  averageRating: number;
  totalReviews: number;
  totalSold: number;
  createdAt: string;
}

export interface Category {
  _id: string;
  name: string;
  nameHindi?: string;
  nameEnglish?: string;
  slug: string;
  description?: string;
  descriptionHindi?: string;
  descriptionEnglish?: string;
  image?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  image: string;
  volume: string;
  quantity: number;
  maxStock: number;
}

export interface OrderItem {
  product: string;
  name: string;
  image: string;
  price: number;
  salePrice?: number;
  quantity: number;
  volume: string;
}

export interface Order {
  _id: string;
  orderId: string;
  customer: {
    name: string;
    mobile: string;
    email?: string;
  };
  shippingAddress: {
    house: string;
    street: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
    deliveryInstructions?: string;
  };
  items: OrderItem[];
  pricing: {
    subtotal: number;
    discount: number;
    couponDiscount: number;
    shippingCharge: number;
    total: number;
  };
  couponCode?: string;
  paymentMethod: 'razorpay' | 'cod';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  orderStatus: 'placed' | 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'return_requested' | 'returned' | 'refunded';
  trackingNumber?: string;
  courierName?: string;
  statusHistory: {
    status: string;
    timestamp: string;
    note?: string;
  }[];
  estimatedDelivery?: string;
  notes?: string;
  createdAt: string;
}

export interface Coupon {
  _id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderValue: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  expiryDate?: string;
  isActive: boolean;
  description?: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  author: string;
  tags: string[];
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
}

export interface Review {
  _id: string;
  product: string | Product;
  customerName: string;
  rating: number;
  title?: string;
  comment: string;
  isApproved: boolean;
  isVerifiedPurchase: boolean;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin?: string;
}
