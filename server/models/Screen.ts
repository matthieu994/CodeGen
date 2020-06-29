import { Schema, model, Document } from "mongoose";

const ScreenSchema = new Schema(
  {
    owningShop: { type: Schema.Types.ObjectId, ref: "Shop", required: true },
    owningUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
    owningCompany: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    associatedUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sshUsername: { type: String, required: true },
    sshPem: { type: String, required: true },
    proofOfViewability: { type: [String], required: true, default: [] },
    surroundingProducts: { type: [Schema.Types.ObjectId], ref: "Product", required: true },
    prefetchedAlgos: { type: [Schema.Types.ObjectId], required: true },
  },
  { timestamps: true }
);

interface IScreen extends Document {
  owningShop: Schema.Types.ObjectId;
  owningUser: Schema.Types.ObjectId;
  owningCompany: Schema.Types.ObjectId;
  associatedUser: Schema.Types.ObjectId;
  sshUsername: string;
  sshPem: string;
  proofOfViewability: [string];
  surroundingProducts: [Schema.Types.ObjectId];
  prefetchedAlgos: [Schema.Types.ObjectId];
  createdAt: Date;
  updatedAt: Date;
}

export const Screen = model<IScreen>("Screen", ScreenSchema);
