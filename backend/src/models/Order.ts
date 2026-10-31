import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  name: string;
  image: string;
  price: number;
  salePrice?: number;
  quantity: number;
  volume: string;
}

export interface IOrder extends Document {
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
  items: IOrderItem[];
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
    timestamp: Date;
    note?: string;
  }[];
  estimatedDelivery?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>({
  orderId: { type: String, required: true, unique: true, index: true },
  customer: {
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    email: { type: String, trim: true }
  },
  shippingAddress: {
    house: { type: String, required: true },
    street: { type: String, required: true },
    landmark: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    deliveryInstructions: String
  },
  items: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    name: { type: String, required: true },
    image: { type: String, default: '' },
    price: { type: Number, required: true },
    salePrice: Number,
    quantity: { type: Number, required: true, min: 1 },
    volume: { type: String, default: '100ml' }
  }],
  pricing: {
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    couponDiscount: { type: Number, default: 0 },
    shippingCharge: { type: Number, default: 0 },
    total: { type: Number, required: true }
  },
  couponCode: String,
  paymentMethod: { type: String, enum: ['razorpay', 'cod'], required: true },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  orderStatus: {
    type: String,
    enum: [
      'placed',
      'confirmed',
      'processing',
      'shipped',
      'out_for_delivery',
      'delivered',
      'cancelled',
      'return_requested',
      'returned',
      'refunded'
    ],
    default: 'placed'
  },
  trackingNumber: String,
  courierName: String,
  statusHistory: [{
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    note: String
  }],
  estimatedDelivery: Date,
  notes: String
}, { timestamps: true });

orderSchema.index({ orderId: 1 });
orderSchema.index({ 'customer.mobile': 1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ createdAt: -1 });

export const Order = mongoose.model<IOrder>('Order', orderSchema);

