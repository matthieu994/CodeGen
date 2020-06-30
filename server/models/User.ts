import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import { MIN_FIRSTNAME, MIN_LASTNAME, MIN_PASSWORD } from "../config/user";
const saltRounds = 10;

export enum UserType {
  "ADMIN",
  "USER",
}

const UserSchema = new Schema(
  {
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
  { timestamps: true }
);

UserSchema.path("email").validate(function (email) {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase().trim());
}, "MAIL_ERROR");

UserSchema.pre<IUser>("save", async function (next) {
  const hash = await bcrypt.hash(this.password, saltRounds);
  this.password = hash;
  next();
});

// UserSchema.pre<any>("findOneAndUpdate", function () {
//   if (this._update.email) this._update.email = this._update.email.toLowerCase();
// });

UserSchema.methods.isValidPassword = async function (password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

export interface IUser extends IUserCreate, Document {
  isValidated?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  isValidPassword?(password: string): Promise<string>;
}
export interface IUserCreate {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  type: string;
}

export const User = model<IUser>("User", UserSchema);
