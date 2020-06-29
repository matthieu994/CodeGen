import { ReportEvent, Viewer } from "../../models/ScreenReport";
import { ReportEvent as GqlReportEvent } from "../types";
import { AdCampaign } from "../../models/AdCampaign";

export const resolvers = {
  ReportEvent: {
    adCampaignId: (reportEvent: GqlReportEvent) => {
      return AdCampaign.findById(reportEvent.adCampaignId);
    },
    viewers: (reportEvent: GqlReportEvent) => {
      return Viewer.find().where("_id").in(reportEvent.viewers);
    },
  },
  Query: {
    allReportEvent: () => {
      return ReportEvent.find({});
    },
    ReportEvent: (_root, args) => {
      return ReportEvent.findById(args.id);
    },
  },
  Mutation: {
    createReportEvent: (_root, args) => {
      return ReportEvent.create(args.input);
    },
    updateReportEvent: (_root, args) => {
      return ReportEvent.findByIdAndUpdate(args.id, args.input, { runValidators: true, new: true });
    },
    deleteReportEvent: (_root, args) => {
      return ReportEvent.findByIdAndDelete(args.id);
    },
  },
};

export const typeDef = `
extend type Query {
  allReportEvent: [ReportEvent]
  ReportEvent(id: ID!): ReportEvent
}
extend type Mutation {
  createReportEvent(input: ReportEventInput!): ReportEvent
  updateReportEvent(id: ID!, input: ReportEventInput): ReportEvent
  deleteReportEvent(id: ID!): ReportEvent
}
input ReportEventInput {
  timestamp: Int
  adCampaignId: ID
  viewers: [ID]
  startDisplay: Boolean
  endDisplay: Boolean
}

type ReportEvent {
  _id: ID!
  timestamp: Int!
  adCampaignId: AdCampaign!
  viewers: [Viewer!]!
  startDisplay: Boolean
  endDisplay: Boolean
}
`;
