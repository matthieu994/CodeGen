import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import { MIN_FIRSTNAME, MIN_LASTNAME, MIN_PASSWORD, MIN_PHONE } from "../config/user";
const saltRounds = 10;

export enum UserType {
  "SUPER_ADMIN",
  "EAM",
  "SAM",
  "SCREEN",
  "TICKET_SCANNER",
}

const UserSchema = new Schema(
  {
    firstname: { type: String, required: true, minlength: MIN_FIRSTNAME },
    lastname: { type: String, required: true, minlength: MIN_LASTNAME },
    password: { type: String, required: true, minlength: MIN_PASSWORD },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true, minlength: MIN_PHONE },
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

UserSchema.path("phone").validate(function (phone) {
  // eslint-disable-next-line no-useless-escape
  const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{5,}$/;
  return re.test(String(phone).trim());
}, "PHONE_ERROR");

UserSchema.pre<IUser>("save", async function (next) {
  const hash = await bcrypt.hash(this.password, saltRounds);
  this.password = hash;
  next();
});

UserSchema.pre<any>("findOneAndUpdate", function () {
  if (this._update.email) this._update.email = this._update.email.toLowerCase();
});

UserSchema.methods.isValidPassword = async function (password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

interface IUserSchema extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  isValidated: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface IUser extends IUserSchema {
  type: string;
  isValidPassword(password: string): Promise<string>;
}

export const User = model<IUser>("User", UserSchema);
