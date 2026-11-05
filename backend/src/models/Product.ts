import mongoose, { Document, Schema } from 'mongoose';

export interface IIngredient {
  name: string;
  description?: string;
  image?: string;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: mongoose.Types.ObjectId;
  images: string[];
  price: number;
  salePrice?: number;
  volume: string;
  ingredients: IIngredient[];
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
  metaTitle?: string;
  metaDescription?: string;
  averageRating: number;
  totalReviews: number;
  totalSold: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  images: [{ type: String }],
  price: { type: Number, required: true, min: 0 },
  salePrice: { type: Number, min: 0 },
  volume: { type: String, default: '100ml' },
  ingredients: [{
    name: { type: String, required: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' }
  }],
  howToUse: { type: String, default: 'Take 5-10 drops in your mouth, swish gently around gums and teeth for 2-3 minutes, rinse thoroughly with fresh water.' },
  storage: { type: String, default: 'Store in a cool, dry place away from direct sunlight. Keep cap tightly closed.' },
  manufacturingInfo: { type: String, default: 'Formulated in Banda, Uttar Pradesh, India under authentic Ayurvedic traditions.' },
  expiryInfo: { type: String, default: 'Best before 24 months from manufacturing date.' },
  stock: { type: Number, required: true, default: 50, min: 0 },
  sku: { type: String, default: '' },
  isFeatured: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  tags: [{ type: String }],
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  averageRating: { type: Number, default: 5 },
  totalReviews: { type: Number, default: 0 },
  totalSold: { type: Number, default: 0 }
}, { timestamps: true });

productSchema.index({ category: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ isBestSeller: 1 });
productSchema.index({ name: 'text', description: 'text', shortDescription: 'text' });

export const Product = mongoose.model<IProduct>('Product', productSchema);

