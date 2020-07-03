// GENERATED BY THE CODEGEN SCRIPT
import { Schema, model, Document } from "mongoose";
import schema from "./schema";
import { IUser } from "../User";

const TestSchema = new Schema(schema.definition, schema.options);

export interface ITest extends Document {
  name: string;
  owner: IUser;
  number?: number;
}

export const Test = model<ITest>("Test", TestSchema);
