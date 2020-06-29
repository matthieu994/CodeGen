import { User } from "../../models/User";

export const resolvers = {
  Query: {
    hello: () => {
      return "Hello ";
    },
    getCurrentUser: (_root, _args, context) => {
      return User.findById(context._id);
    },
    allUser: () => {
      return User.find({});
    },
    User: (_root, args) => {
      return User.findById(args.id);
    },
  },
  Mutation: {
    createUser: (_root, args) => {
      return User.create(args.input);
    },
    updateUser: (_root, args) => {
      return User.findByIdAndUpdate(args.id, args.input, { runValidators: true, new: true });
    },
    deleteUser: (_root, args) => {
      return User.findByIdAndDelete(args.id);
    },
  },
};

export const typeDef = `
extend type Query {
  hello: String
  getCurrentUser: User
  allUser: [User]
  User(id: ID!): User
}

extend type Mutation {
  createUser(input: UserInput): User
  updateUser(id: ID!, input: UserInput): User
  deleteUser(id: ID!): User
}

input UserInput {
  firstname: String
  lastname: String
  email: String
  password: String
  phone: String
  type: UserType
}

enum UserType {
  SUPER_ADMIN
  EAM
  SAM
  SCREEN
  TICKET_SCANNER
}
type User {
  _id: ID!
  graphqlField: String
  firstname: String!
  lastname: String!
  email: String!
  password: String!
  phone: String!
  type: UserType!
  isValidated: Boolean!
  isDeleted: Boolean!
  createdAt: Date!
  updatedAt: Date!
}`;
