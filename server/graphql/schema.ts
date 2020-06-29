import { merge } from "lodash";
import "graphql-import-node";
import { mergeSchemas, makeExecutableSchema } from "graphql-tools";
import { GraphQLSchema } from "graphql";
import { typeDef as User, resolvers as UserResolvers } from "./schemas/User";
import { typeDef as AdCampaign, resolvers as AdCampaignResolvers } from "./schemas/AdCampaign";
import { typeDef as AlgoScoring, resolvers as AlgoScoringResolvers } from "./schemas/AlgoScoring";
import { typeDef as Brand, resolvers as BrandResolvers } from "./schemas/Brand";
import { typeDef as Company, resolvers as CompanyResolvers } from "./schemas/Company";
import { typeDef as Product, resolvers as ProductResolvers } from "./schemas/Product";
import { typeDef as Screen, resolvers as ScreenResolvers } from "./schemas/Screen";
import { typeDef as Report, resolvers as ReportResolvers } from "./schemas/Report";
import { typeDef as ReportEvent, resolvers as ReportEventResolvers } from "./schemas/ReportEvent";
import { typeDef as Viewer, resolvers as ViewerResolvers } from "./schemas/Viewer";
import { typeDef as Shop, resolvers as ShopResolvers } from "./schemas/Shop";
import { typeDef as Ticket, resolvers as TicketResolvers } from "./schemas/Ticket";
import {
  typeDef as TicketScanner,
  resolvers as TicketScannerResolvers,
} from "./schemas/TicketScanner";

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
  typeDefs: [
    Query,
    AdCampaign,
    AlgoScoring,
    Brand,
    Company,
    Product,
    Screen,
    Report,
    ReportEvent,
    Viewer,
    Shop,
    Ticket,
    TicketScanner,
    User,
  ],
  resolvers: merge(
    UserResolvers,
    CompanyResolvers,
    ShopResolvers,
    AdCampaignResolvers,
    AlgoScoringResolvers,
    BrandResolvers,
    ProductResolvers,
    ScreenResolvers,
    ReportResolvers,
    ReportEventResolvers,
    ViewerResolvers,
    TicketResolvers,
    TicketScannerResolvers
  ),
});

const schema = mergeSchemas({
  schemas: [coreSchemas],
});

export default schema;
