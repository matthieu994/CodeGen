import { Schema, model, Document } from "mongoose";

const TicketSchema = new Schema(
  {
    boughtItems: {
      type: [
        {
          productName: { type: String, required: true },
          productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
          price: { type: Number, required: true },
        },
      ],
      required: true,
    },
    owningCompany: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    owningBrand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
    owningTicketScanner: { type: Schema.Types.ObjectId, ref: "TicketScanner", required: true },
  },
  { timestamps: true }
);

export interface ITicket extends Document {
  boughtItems: Array<{
    productName: string;
    productId: Schema.Types.ObjectId;
    price: number;
  }>;
  owningCompany: Schema.Types.ObjectId;
  owningBrand: Schema.Types.ObjectId;
  owningTicketScanner: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const Ticket = model<ITicket>("Ticket", TicketSchema);
