import mongoose, { Document, Schema } from 'mongoose';

export interface IWebsiteSettings extends Document {
  key: string;
  value: any;
  createdAt: Date;
  updatedAt: Date;
}

const websiteSettingsSchema = new Schema<IWebsiteSettings>({
  key: { type: String, required: true, unique: true },
  value: Schema.Types.Mixed
}, { timestamps: true });

export const WebsiteSettings = mongoose.model<IWebsiteSettings>('WebsiteSettings', websiteSettingsSchema);

