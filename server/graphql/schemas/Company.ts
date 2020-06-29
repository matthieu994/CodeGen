import { Company } from "../../models/Company";
import { User } from "../../models/User";
import { Company as GqlCompany } from "../types";

export const resolvers = {
  Company: {
    owningUser: (company: GqlCompany) => {
      return User.findById(company.owningUser);
    },
  },
  Query: {
    allCompany: () => {
      return Company.find({});
    },
    Company: (_root, args) => {
      return Company.findById(args.id);
    },
  },
  Mutation: {
    createCompany: (_root, args) => {
      return Company.create(args.input);
    },
    updateCompany: (_root, args) => {
      return Company.findByIdAndUpdate(args.id, args.input, { runValidators: true, new: true });
    },
    deleteCompany: (_root, args) => {
      return Company.findByIdAndDelete(args.id);
    },
  },
};

export const typeDef = `
extend type Query {
  allCompany: [Company]
  Company(id: ID!): Company
}

extend type Mutation {
  createCompany(input: CompanyInput!): Company
  updateCompany(id: ID!, input: CompanyInput): Company
  deleteCompany(id: ID!): Company
}

input CompanyInput {
  name: String
  owningUser: ID
  businessOfficialId: String
  vatNumber: String
}

type Company {
  _id: ID!
  name: String!
  owningUser: User!
  businessOfficialId: String
  vatNumber: String
  createdAt: Date!
  updatedAt: Date!
}
`;
