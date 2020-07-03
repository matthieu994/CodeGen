const definition = {
  name: { type: String, required: true, unique: true },
  owner: { type: "ObjectId", ref: "User", required: true },
  number: { type: Number },
};
const options = { timestamps: true };

export default {
  definition,
  options,
};
