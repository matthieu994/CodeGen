import { Brand } from "../../models/Brand";
import { Company } from "../../models/Company";
import { Ticket } from "../../models/Ticket";
import { Ticket as GqlTicket } from "../types";

export const resolvers = {
  Ticket: {
    owningCompany: (ticket: GqlTicket) => {
      return Company.findById(ticket.owningCompany);
    },
    owningBrand: (ticket: GqlTicket) => {
      return Brand.findById(ticket.owningBrand);
    },
  },
  Query: {
    allTicket: () => {
      return Ticket.find({});
    },
    Ticket: (_root, args) => {
      return Ticket.findById(args.id);
    },
  },
  Mutation: {
    createTicket: (_root, args) => {
      return Ticket.create(args.input);
    },
    updateTicket: (_root, args) => {
      return Ticket.findByIdAndUpdate(args.id, args.input, { runValidators: true, new: true });
    },
    deleteTicket: (_root, args) => {
      return Ticket.findByIdAndDelete(args.id);
    },
  },
};

export const typeDef = `
extend type Query {
  allTicket: [Ticket]
  Ticket(id: ID!): Ticket
}

extend type Mutation {
  createTicket(input: TicketInput!): Ticket
  updateTicket(id: ID!, input: TicketInput): Ticket
  deleteTicket(id: ID!): Ticket
}

input TicketInput {
  boughtItems: [BoughtItemInput]
  owningCompany: ID
  owningBrand: ID
  owningTicketScanner: ID
}
input BoughtItemInput {
  productName: String!
  productId: ID!
  price: Float!
}

type BoughtItem {
  productName: String!
  productId: ID!
  price: Float!
}
type Ticket {
  _id: ID!
  boughtItems: [BoughtItem!]!
  owningCompany: Company!
  owningBrand: Brand!
  owningTicketScanner: TicketScanner!
  createdAt: Date!
  updatedAt: Date!
}`;
