import { Schema, model, Document } from "mongoose";

const AdCampaignSchema = new Schema(
  {
    owningCompany: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    owningShop: { type: Schema.Types.ObjectId, ref: "Shop", required: true },
  },
  { timestamps: true }
);

export interface IAdCampaign extends Document {
  owningCompany: Schema.Types.ObjectId;
  owningShop: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const AdCampaign = model<IAdCampaign>("AdCampaign", AdCampaignSchema);
