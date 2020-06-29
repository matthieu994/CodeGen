import { Schema, model, Document } from "mongoose";

const TicketScannerSchema = new Schema(
  {
    owningCompany: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    owningShop: { type: Schema.Types.ObjectId, ref: "Shop", required: true },
  },
  { timestamps: true }
);

export interface ITicketScanner extends Document {
  owningCompany: Schema.Types.ObjectId;
  owningShop: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const TicketScanner = model<ITicketScanner>("TicketScanner", TicketScannerSchema);
