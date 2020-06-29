import { Schema, model, Document } from "mongoose";

const BrandSchema = new Schema(
  {
    name: { type: String, required: true },
    owningCompany: { type: Schema.Types.ObjectId, ref: "Company" },
  },
  { timestamps: true }
);

export interface IBrand extends Document {
  name: string;
  owningCompany?: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const Brand = model<IBrand>("Brand", BrandSchema);
