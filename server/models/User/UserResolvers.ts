import { User } from "./";

export default {
  Query: {
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
