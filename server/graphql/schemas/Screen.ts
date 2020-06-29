import { User } from "../../models/User";
import { Company } from "../../models/Company";
import { Shop } from "../../models/Shop";
import { Screen } from "../../models/Screen";
import { Screen as GqlScreen } from "../types";
import { AlgoScoring } from "../../models/AlgoScoring";
import { Product } from "../../models/Product";

export const resolvers = {
  Screen: {
    owningShop: (screen: GqlScreen) => {
      return Shop.findById(screen.owningShop);
    },
    owningUser: (screen: GqlScreen) => {
      return User.findById(screen.owningUser);
    },
    owningCompany: (screen: GqlScreen) => {
      return Company.findById(screen.owningCompany);
    },
    associatedUser: (screen: GqlScreen) => {
      return Company.findById(screen.associatedUser);
    },
    surroundingProducts: (screen: GqlScreen) => {
      return Product.find().where("_id").in(screen.surroundingProducts);
    },
    prefetchedAlgos: (screen: GqlScreen) => {
      return AlgoScoring.find().where("_id").in(screen.prefetchedAlgos);
    },
  },
  Query: {
    allScreen: () => {
      return Screen.find({});
    },
    Screen: (_root, args) => {
      return Screen.findById(args.id);
    },
  },
  Mutation: {
    createScreen: (_root, args) => {
      return Screen.create(args.input);
    },
    updateScreen: (_root, args) => {
      return Screen.findByIdAndUpdate(args.id, args.input, { runValidators: true, new: true });
    },
    deleteScreen: (_root, args) => {
      return Screen.findByIdAndDelete(args.id);
    },
  },
};

export const typeDef = `
extend type Query {
  allScreen: [Screen]
  Screen(id: ID!): Screen
}

extend type Mutation {
  createScreen(input: ScreenInput!): Screen
  updateScreen(id: ID!, input: ScreenInput): Screen
  deleteScreen(id: ID!): Screen
}

input ScreenInput {
  owningShop: ID
  owningUser: ID
  owningCompany: ID
  associatedUser: ID
  sshUsername: String
  sshPem: String
  proofOfViewability: [String]
  surroundingProducts: [ID]
  prefetchedAlgos: [ID]
}

type Screen {
  _id: ID!
  owningShop: Shop!
  owningUser: User!
  owningCompany: Company!
  associatedUser: User!
  sshUsername: String!
  sshPem: String!
  proofOfViewability: [String!]!
  surroundingProducts: [Product!]!
  prefetchedAlgos: [AlgoScoring!]!
  createdAt: Date!
  updatedAt: Date!
}`;
