import { Schema, model, Document } from "mongoose";

const ShopSchema = new Schema(
  {
    name: { type: String, required: true },
    owningUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
    owningCompany: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    address: { type: String, required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    screens: { type: [Schema.Types.ObjectId], ref: "Screen", required: true, default: [] },
    ticketScanners: {
      type: [Schema.Types.ObjectId],
      ref: "TicketScanner",
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

interface IShop extends Document {
  name: string;
  owningUser: Schema.Types.ObjectId;
  owningCompany: Schema.Types.ObjectId;
  address: string;
  location: {
    type: string;
    coordinates: [number];
  };
  screens: [Schema.Types.ObjectId];
  ticketScanners: [Schema.Types.ObjectId];
  createdAt: Date;
  updatedAt: Date;
}

export const Shop = model<IShop>("Shop", ShopSchema);
