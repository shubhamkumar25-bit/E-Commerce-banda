import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email?: string;
  mobile: string;
  isGuest: boolean;
  addresses: {
    house: string;
    street: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, lowercase: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  isGuest: { type: Boolean, default: true },
  addresses: [{
    house: String,
    street: String,
    landmark: String,
    city: String,
    state: String,
    pincode: String,
    isDefault: { type: Boolean, default: false }
  }]
}, { timestamps: true });

userSchema.index({ mobile: 1 });
userSchema.index({ email: 1 });

export const User = mongoose.model<IUser>('User', userSchema);

