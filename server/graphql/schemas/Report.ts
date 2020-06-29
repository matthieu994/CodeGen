import { Screen } from "../../models/Screen";
import { Report, ReportEvent } from "../../models/ScreenReport";
import { Report as GqlReport } from "../types";

export const resolvers = {
  Report: {
    reportEvents: (report: GqlReport) => {
      return ReportEvent.find().where("_id").in(report.reportEvents);
    },
    owningScreen: (report: GqlReport) => {
      return Screen.findById(report.owningScreen);
    },
  },
  Query: {
    allReport: () => {
      return Report.find({});
    },
    Report: (_root, args) => {
      return Report.findById(args.id);
    },
  },
  Mutation: {
    createReport: (_root, args) => {
      return Report.create(args.input);
    },
    updateReport: (_root, args) => {
      return Report.findByIdAndUpdate(args.id, args.input, { runValidators: true, new: true });
    },
    deleteReport: (_root, args) => {
      return Report.findByIdAndDelete(args.id);
    },
  },
};

export const typeDef = `
extend type Query {
  allReport: [Report]
  Report(id: ID!): Report
}
extend type Mutation {
  createReport(input: ReportInput!): Report
  updateReport(id: ID!, input: ReportInput): Report
  deleteReport(id: ID!): Report
}
input ReportInput {
  reportEvents: [ID]
  owningScreen: ID
  reportAlgoVersion: Float
}

type Report {
  _id: ID!
  reportEvents: [ReportEvent!]!
  owningScreen: Screen!
  reportAlgoVersion: Float!
  createdAt: Date!
  updatedAt: Date!
}
`;
