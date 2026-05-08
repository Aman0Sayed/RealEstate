import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  description: string;
  price: number;
  address: string;
  lat?: number;
  lng?: number;
  images: string[];
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  status: 'available' | 'pending' | 'sold' | 'reserved';
  owner: mongoose.Types.ObjectId;
}

const PropertySchema: Schema = new Schema<IProperty>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  address: { type: String, required: true },
  lat: { type: Number },
  lng: { type: Number },
  images: { type: [String], default: [] },
  beds: { type: Number, default: 0 },
  baths: { type: Number, default: 0 },
  sqft: { type: Number, default: 0 },
  type: { type: String },
  status: { type: String, enum: ['available', 'pending', 'sold', 'reserved'], default: 'available' },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model<IProperty>('Property', PropertySchema);
