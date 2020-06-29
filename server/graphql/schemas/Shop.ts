import { User } from "../../models/User";
import { Company } from "../../models/Company";
import { Shop } from "../../models/Shop";
import { TicketScanner } from "../../models/TicketScanner";
import { Screen } from "../../models/Screen";
import { Shop as GqlShop } from "../types";

export const resolvers = {
  Shop: {
    owningCompany: (shop: GqlShop) => {
      return Company.findById(shop.owningCompany);
    },
    owningUser: (shop: GqlShop) => {
      return User.findById(shop.owningUser);
    },
    screens: (shop: GqlShop) => {
      return Screen.find().where("_id").in(shop.screens);
    },
    ticketScanners: (shop: GqlShop) => {
      return TicketScanner.find().where("_id").in(shop.ticketScanners);
    },
  },
  Query: {
    allShop: () => {
      return Shop.find({});
    },
    Shop: (_root, args) => {
      return Shop.findById(args.id);
    },
  },
  Mutation: {
    createShop: (_root, args) => {
      return Shop.create(args.input);
    },
    updateShop: (_root, args) => {
      return Shop.findByIdAndUpdate(args.id, args.input, { runValidators: true, new: true });
    },
    deleteShop: (_root, args) => {
      return Shop.findByIdAndDelete(args.id);
    },
  },
};

export const typeDef = `
extend type Query {
  allShop: [Shop]
  Shop(id: ID!): Shop
}

extend type Mutation {
  createShop(input: ShopInput): Shop
  updateShop(id: ID!, input: ShopInput): Shop
  deleteShop(id: ID!): Shop
}

input ShopInput {
  name: String
  owningUser: ID
  owningCompany: ID
  address: String
  location: LocationInput
  screens: [ID]
  ticketScanners: [ID]
}
input LocationInput {
  type: String!
  coordinates: [Float!]!
}

type Location {
  type: String!
  coordinates: [Float!]!
}
type Shop {
  _id: ID!
  name: String!
  owningUser: User!
  owningCompany: Company!
  address: String!
  location: Location!
  screens: [Screen!]!
  ticketScanners: [TicketScanner!]!
  createdAt: Date!
  updatedAt: Date!
}`;
