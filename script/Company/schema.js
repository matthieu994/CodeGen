const definition = {
  name: { type: String, required: true, unique: true },
  owningUser: { type: "ObjectId", ref: "User", required: true },
  businessOfficialId: { type: String },
  vatNumber: { type: String },
};
const options = { timestamps: true };

module.exports = {
  definition,
  options,
};
