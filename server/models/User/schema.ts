import { MIN_FIRSTNAME, MIN_LASTNAME, MIN_PASSWORD } from "../../config/user";

export enum UserType {
  "ADMIN",
  "USER",
}

export default {
  definition: {
    firstname: { type: String, required: true, minlength: MIN_FIRSTNAME },
    lastname: { type: String, required: true, minlength: MIN_LASTNAME },
    password: { type: String, required: true, minlength: MIN_PASSWORD },
    email: { type: String, unique: true, required: true },
    type: {
      type: String,
      enum: Object.keys(UserType),
      required: true,
    },
    isValidated: { type: Boolean, required: true, default: false },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  options: { timestamps: true },
};
