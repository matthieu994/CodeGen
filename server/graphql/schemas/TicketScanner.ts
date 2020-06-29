import { Company } from "../../models/Company";
import { Shop } from "../../models/Shop";
import { TicketScanner } from "../../models/TicketScanner";
import { TicketScanner as GqlTicketScanner } from "../types";

export const resolvers = {
  TicketScanner: {
    owningCompany: (ticketScanner: GqlTicketScanner) => {
      return Company.findById(ticketScanner.owningCompany);
    },
    owningShop: (ticketScanner: GqlTicketScanner) => {
      return Shop.findById(ticketScanner.owningShop);
    },
  },
  Query: {
    allTicketScanner: () => {
      return TicketScanner.find({});
    },
    TicketScanner: (_root, args) => {
      return TicketScanner.findById(args.id);
    },
  },
  Mutation: {
    createTicketScanner: (_root, args) => {
      return TicketScanner.create(args.input);
    },
    updateTicketScanner: (_root, args) => {
      return TicketScanner.findByIdAndUpdate(args.id, args.input, {
        runValidators: true,
        new: true,
      });
    },
    deleteTicketScanner: (_root, args) => {
      return TicketScanner.findByIdAndDelete(args.id);
    },
  },
};

export const typeDef = `
extend type Query {
  allTicketScanner: [TicketScanner]
  TicketScanner(id: ID!): TicketScanner
}

extend type Mutation {
  createTicketScanner(input: TicketScannerInput!): TicketScanner
  updateTicketScanner(id: ID!, input: TicketScannerInput): TicketScanner
  deleteTicketScanner(id: ID!): TicketScanner
}

input TicketScannerInput {
  owningCompany: ID
  owningShop: ID
}

type TicketScanner {
  _id: ID!
  owningCompany: Company!
  owningShop: Shop!
  createdAt: Date!
  updatedAt: Date!
}
`;
