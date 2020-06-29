import { AlgoScoring } from "../../models/AlgoScoring";

export const resolvers = {
  Query: {
    allAlgoScoring: () => {
      return AlgoScoring.find({});
    },
    AlgoScoring: (_root, args) => {
      return AlgoScoring.findById(args.id);
    },
  },
  Mutation: {
    createAlgoScoring: (_root, args) => {
      return AlgoScoring.create(args.input);
    },
    updateAlgoScoring: (_root, args) => {
      return AlgoScoring.findByIdAndUpdate(args.id, args.input, { runValidators: true, new: true });
    },
    deleteAlgoScoring: (_root, args) => {
      return AlgoScoring.findByIdAndDelete(args.id);
    },
  },
};

export const typeDef = `
extend type Query {
  allAlgoScoring: [AlgoScoring]
  AlgoScoring(id: ID!): AlgoScoring
}

extend type Mutation {
  createAlgoScoring(input: AlgoScoringInput!): AlgoScoring
  updateAlgoScoring(id: ID!, input: AlgoScoringInput): AlgoScoring
  deleteAlgoScoring(id: ID!): AlgoScoring
}

input AlgoScoringInput {
  url: String
}

type AlgoScoring {
  _id: ID!
  url: String!
  createdAt: Date!
  updatedAt: Date!
}`;
