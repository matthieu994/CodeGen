import { Schema } from "mongoose";

export default {
  definition: {
    name: { type: String, required: true, unique: true },
    owningUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
    businessOfficialId: { type: String },
    vatNumber: { type: String },
  },
  options: { timestamps: true },
};
