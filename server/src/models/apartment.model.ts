import mongoose, { Document, Schema } from 'mongoose';

export interface IApartment extends Document {
    unitNumber: string;
    unitName: string;
    project: string;
    description: string;
    size: number;
    bedrooms: number;
    bathrooms: number;
    price: number;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
}

const ApartmentSchema: Schema = new Schema({
  unitNumber: { type: String, required: [true, "Unit Number is required"] },
  unitName: { type: String, required: [true, "Unit Name is required"] },
  project: { type: String, required: [true, "Project is required"] },
  description: { type: String, required: [true, "Description is required"] },
  size: { type: Number, required: [true, "Size is required"] },
  bedrooms: { type: Number, required: [true, "Bedrooms number is required"] },
  bathrooms: { type: Number, required: [true, "Bathrooms number is required"] },
  price: { type: Number, required: [true, "Price is required"] },
  images: [{ type: String }],
}, {
  timestamps: true
});

export default mongoose.model<IApartment>('Apartment', ApartmentSchema);