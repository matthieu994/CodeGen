import { Brand } from "../../models/Brand";
import { Company } from "../../models/Company";
import { Brand as GqlBrand } from "../types";

export const resolvers = {
  Brand: {
    owningCompany: (brand: GqlBrand) => {
      return Company.findById(brand.owningCompany);
    },
  },
  Query: {
    allBrand: () => {
      return Brand.find({});
    },
    Brand: (_root, args) => {
      return Brand.findById(args.id);
    },
  },
  Mutation: {
    createBrand: (_root, args) => {
      return Brand.create(args.input);
    },
    updateBrand: (_root, args) => {
      return Brand.findByIdAndUpdate(args.id, args.input, { runValidators: true, new: true });
    },
    deleteBrand: (_root, args) => {
      return Brand.findByIdAndDelete(args.id);
    },
  },
};

export const typeDef = `
extend type Query {
  allBrand: [Brand]
  Brand(id: ID!): Brand
}

extend type Mutation {
  createBrand(input: BrandInput!): Brand
  updateBrand(id: ID!, input: BrandInput): Brand
  deleteBrand(id: ID!): Brand
}

input BrandInput {
  name: String
  owningCompany: ID
}

type Brand {
  _id: ID!
  name: String!
  owningCompany: Company
  createdAt: Date!
  updatedAt: Date!
}`;
