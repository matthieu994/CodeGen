import { IResolvers } from "graphql-tools";

const resolverMap: IResolvers = {
  Query: {
    hello: () => "Hello from GraphQL !",
  },
};
export default resolverMap;
