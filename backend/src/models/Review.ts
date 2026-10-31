import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  product: mongoose.Types.ObjectId;
  order?: mongoose.Types.ObjectId;
  customerName: string;
  customerMobile?: string;
  rating: number;
  title?: string;
  comment: string;
  isApproved: boolean;
  isVerifiedPurchase: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  order: { type: Schema.Types.ObjectId, ref: 'Order' },
  customerName: { type: String, required: true, trim: true },
  customerMobile: { type: String, trim: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: String,
  comment: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
  isVerifiedPurchase: { type: Boolean, default: false }
}, { timestamps: true });

reviewSchema.index({ product: 1, isApproved: 1 });
reviewSchema.index({ createdAt: -1 });

export const Review = mongoose.model<IReview>('Review', reviewSchema);

