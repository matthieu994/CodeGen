import { Schema, model, Document } from "mongoose";

const schema = {
  definition: {
    name: { type: String, required: true, unique: true },
    owningUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
    businessOfficialId: { type: String },
    vatNumber: { type: String },
  },
  options: { timestamps: true },
};

const CompanySchema = new Schema(schema.definition, schema.options);

interface ICompany extends Document {
  name: string;
  owningUser: Schema.Types.ObjectId;
  businessOfficialId?: string;
  vatNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const Company = model<ICompany>("Company", CompanySchema);
