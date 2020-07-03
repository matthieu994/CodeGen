// GENERATED BY THE CODEGEN SCRIPT
import { merge } from "lodash";
import fs from "fs";

function getModels() {
  return fs
    .readdirSync("./models/")
    .filter((file) => fs.statSync("./models/" + file).isDirectory())
    .map((dir) => {
      return require(`../models/${dir}`);
    });
}

const typeDefs = getModels().map((doc) => doc.typeDef);
const resolvers = merge(getModels().map((doc) => doc.resolvers));

export { typeDefs, resolvers };
