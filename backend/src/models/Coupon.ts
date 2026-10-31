import mongoose, { Document, Schema } from 'mongoose';

export interface ICoupon extends Document {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderValue: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  expiryDate?: Date;
  isActive: boolean;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const couponSchema = new Schema<ICoupon>({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true },
  type: { type: String, enum: ['percentage', 'fixed'], required: true },
  value: { type: Number, required: true, min: 0 },
  minOrderValue: { type: Number, default: 0 },
  maxDiscount: Number,
  usageLimit: Number,
  usedCount: { type: Number, default: 0 },
  expiryDate: Date,
  isActive: { type: Boolean, default: true },
  description: String
}, { timestamps: true });

couponSchema.index({ code: 1 });
couponSchema.index({ isActive: 1 });

export const Coupon = mongoose.model<ICoupon>('Coupon', couponSchema);

