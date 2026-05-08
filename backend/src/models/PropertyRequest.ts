import mongoose, { Schema, Document } from 'mongoose';

export interface IPropertyRequest extends Document {
  propertyId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  userName: string;
  userEmail: string;
  status: 'pending' | 'approved' | 'rejected';
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PropertyRequestSchema: Schema = new Schema<IPropertyRequest>({
  propertyId: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  message: { type: String }
}, { timestamps: true });

export default mongoose.model<IPropertyRequest>('PropertyRequest', PropertyRequestSchema);
