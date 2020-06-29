import { Schema, model, Document } from "mongoose";

const CompanySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    owningUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
    businessOfficialId: { type: String },
    vatNumber: { type: String },
  },
  { timestamps: true }
);

interface ICompany extends Document {
  name: string;
  owningUser: Schema.Types.ObjectId;
  businessOfficialId?: string;
  vatNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const Company = model<ICompany>("Company", CompanySchema);
