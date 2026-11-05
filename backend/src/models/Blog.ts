import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  author: string;
  tags: string[];
  isPublished: boolean;
  metaTitle?: string;
  metaDescription?: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, default: '' },
  author: { type: String, default: 'JEEVAN SHAILI Ayurvedic Care' },
  tags: [{ type: String }],
  isPublished: { type: Boolean, default: true },
  metaTitle: String,
  metaDescription: String,
  publishedAt: { type: Date, default: Date.now }
}, { timestamps: true });

blogSchema.index({ isPublished: 1 });
blogSchema.index({ publishedAt: -1 });

export const Blog = mongoose.model<IBlog>('Blog', blogSchema);
