import { Viewer } from "../../models/ScreenReport";

export const resolvers = {
  Query: {
    allViewer: () => {
      return Viewer.find({});
    },
    Viewer: (_root, args) => {
      return Viewer.findById(args.id);
    },
  },
  Mutation: {
    createViewer: (_root, args) => {
      return Viewer.create(args.input);
    },
    updateViewer: (_root, args) => {
      return Viewer.findByIdAndUpdate(args.id, args.input, { runValidators: true, new: true });
    },
    deleteViewer: (_root, args) => {
      return Viewer.findByIdAndDelete(args.id);
    },
  },
};

export const typeDef = `
extend type Query {
  allViewer: [Viewer]
  Viewer(id: ID!): Viewer
}
extend type Mutation {
  createViewer(input: ViewerInput!): Viewer
  updateViewer(id: ID!, input: ViewerInput): Viewer
  deleteViewer(id: ID!): Viewer
}
input ViewerInput {
  views: [ViewInput]
  boxes: [BoxInput]
  gender: Gender
  age: Float
  fashionId: Float
}
input ViewInput {
  start: Float!
  end: Float!
}
input PointInput {
  x: Float!
  y: Float!
}
input BoxInput {
  timestamp: Float!
  topLeft: PointInput!
  bottomRight: PointInput!
}

enum Gender {
  MALE
  FEMALE
}
type View {
  start: Float!
  end: Float!
}
type Point {
  x: Float!
  y: Float!
}
type Box {
  timestamp: Float!
  topLeft: Point!
  bottomRight: Point!
}
type Viewer {
  _id: ID!
  views: [View!]!
  boxes: [Box!]!
  gender: Gender!
  age: Float!
  fashionId: Float!
}
`;
