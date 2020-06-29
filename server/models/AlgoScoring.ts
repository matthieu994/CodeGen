import { Schema, model, Document } from "mongoose";

const AlgoScoringSchema = new Schema(
  {
    url: { type: String, required: true },
  },
  { timestamps: true }
);

export interface IAlgoScoring extends Document {
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export const AlgoScoring = model<IAlgoScoring>("AlgoScoring", AlgoScoringSchema);
