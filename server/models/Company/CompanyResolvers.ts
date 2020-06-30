import { Company } from "./CompanyModel";
import { User } from "../../models/User";
import { Company as GqlCompany } from "../../graphql/types";

export default {
  Company: {
    owningUser: (company: GqlCompany) => {
      return User.findById(company.owningUser);
    },
  },
  Query: {
    allCompany: () => {
      return Company.find({});
    },
    Company: (_root, args) => {
      return Company.findById(args.id);
    },
  },
  Mutation: {
    createCompany: (_root, args) => {
      return Company.create(args.input);
    },
    updateCompany: (_root, args) => {
      return Company.findByIdAndUpdate(args.id, args.input, { runValidators: true, new: true });
    },
    deleteCompany: (_root, args) => {
      return Company.findByIdAndDelete(args.id);
    },
  },
};
