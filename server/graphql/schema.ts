import { mergeSchemas, makeExecutableSchema } from "graphql-tools";
import { GraphQLSchema } from "graphql";

import { typeDefs, resolvers } from "./imports";

const Query = `
  scalar Date
  
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

const coreSchemas: GraphQLSchema = makeExecutableSchema({
  typeDefs: [Query, ...typeDefs],
  resolvers: resolvers,
});

const schema = mergeSchemas({
  schemas: [coreSchemas],
});

export default schema;
