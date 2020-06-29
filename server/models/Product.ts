import { Schema, model, Document } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    owningCompany: { type: Schema.Types.ObjectId, ref: "Company" },
    owningBrand: { type: Schema.Types.ObjectId, ref: "Brand" },
  },
  { timestamps: true }
);

export interface IProduct extends Document {
  name: string;
  owningCompany?: Schema.Types.ObjectId;
  owningBrand?: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const Product = model<IProduct>("Product", ProductSchema);
