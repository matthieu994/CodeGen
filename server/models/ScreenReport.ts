import { Schema, model, Document } from "mongoose";

const ReportSchema = new Schema(
  {
    reportEvents: { type: [Schema.Types.ObjectId], ref: "ReportEvent", required: true },
    owningScreen: { type: Schema.Types.ObjectId, ref: "Screen", required: true },
    reportAlgoVersion: { type: Number, required: true },
  },
  { timestamps: true }
);
export interface IReport extends Document {
  reportEvents: [Schema.Types.ObjectId];
  owningScreen: Schema.Types.ObjectId;
  reportAlgoVersion: number;
  createdAt: Date;
  updatedAt: Date;
}

const ReportEventSchema = new Schema({
  timestamp: { type: Number, required: true },
  adCampaignId: { type: Schema.Types.ObjectId, ref: "AdCampaign", required: true },
  viewers: { type: [Schema.Types.ObjectId], ref: "Viewer", required: true },
  startDisplay: { type: Boolean },
  endDisplay: { type: Boolean },
});
export interface IReportEvent extends Document {
  timestamp: number;
  adCampaignId: Schema.Types.ObjectId;
  viewers: [Schema.Types.ObjectId];
  startDisplay?: boolean;
  endDisplay?: boolean;
}

const ViewerSchema = new Schema({
  views: { type: [{ start: Number, end: Number }], required: true },
  boxes: {
    type: [
      {
        timestamp: {
          type: Number,
          required: true,
        },
        topLeft: {
          x: {
            type: Number,
            required: true,
          },
          y: {
            type: Number,
            required: true,
          },
        },
        bottomRight: {
          x: {
            type: Number,
            required: true,
          },
          y: {
            type: Number,
            required: true,
          },
        },
      },
    ],
    required: true,
  },
  gender: { type: String, enum: ["MALE", "FEMALE"], required: true },
  age: { type: Number, required: true },
  fashionId: { type: Number, required: true },
});
enum Gender {
  "MALE",
  "FEMALE",
}
export interface IViewer extends Document {
  views: Array<{ start: number; end: number }>;
  boxes: Array<{
    timestamp: number;
    topLeft: { x: number; y: number };
    bottomRight: { x: number; y: number };
  }>;
  gender: Gender;
  age: number;
  fashionId: number;
}

export const Report = model<IReport>("Report", ReportSchema);
export const ReportEvent = model<IReportEvent>("ReportEvent", ReportEventSchema);
export const Viewer = model<IViewer>("Viewer", ViewerSchema);
