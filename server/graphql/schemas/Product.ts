import { Brand } from "../../models/Brand";
import { Company } from "../../models/Company";
import { Product } from "../../models/Product";
import { Product as GqlProduct } from "../types";

export const resolvers = {
  Product: {
    owningCompany: (product: GqlProduct) => {
      return Company.findById(product.owningCompany);
    },
    owningBrand: (product: GqlProduct) => {
      return Brand.findById(product.owningBrand);
    },
  },
  Query: {
    allProduct: () => {
      return Product.find({});
    },
    Product: (_root, args) => {
      return Product.findById(args.id);
    },
  },
  Mutation: {
    createProduct: (_root, args) => {
      return Product.create(args.input);
    },
    updateProduct: (_root, args) => {
      return Product.findByIdAndUpdate(args.id, args.input, { runValidators: true, new: true });
    },
    deleteProduct: (_root, args) => {
      return Product.findByIdAndDelete(args.id);
    },
  },
};

export const typeDef = `
extend type Query {
  allProduct: [Product]
  Product(id: ID!): Product
}

extend type Mutation {
  createProduct(input: ProductInput!): Product
  updateProduct(id: ID!, input: ProductInput): Product
  deleteProduct(id: ID!): Product
}

input ProductInput {
  name: String
  owningCompany: ID!
  owningBrand: ID!
}

type Product {
  _id: ID!
  name: String!
  owningCompany: Company
  owningBrand: Brand
  createdAt: Date!
  updatedAt: Date!
}`;
