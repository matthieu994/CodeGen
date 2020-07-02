import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import schema from "./schema";

const UserSchema = new Schema(schema.definition, schema.options);

UserSchema.path("email").validate(function (email) {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase().trim());
}, "MAIL_ERROR");

const saltRounds = 10;
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

export interface IUser extends IUserCreate {
  isValidated: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  isValidPassword(password: string): Promise<string>;
}
export interface IUserCreate extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  type: string;
}

export const User = model<IUser | IUserCreate>("User", UserSchema);
