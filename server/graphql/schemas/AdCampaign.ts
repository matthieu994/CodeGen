import { AdCampaign } from "../../models/AdCampaign";
import { Shop } from "../../models/Shop";
import { Company } from "../../models/Company";
import { AdCampaign as GqlAdCampaign } from "../types";

export const resolvers = {
  AdCampaign: {
    owningCompany: (AdCampaign: GqlAdCampaign) => {
      return Company.findById(AdCampaign.owningCompany);
    },
    owningShop: (AdCampaign: GqlAdCampaign) => {
      return Shop.findById(AdCampaign.owningShop);
    },
  },
  Query: {
    allAdCampaign: () => {
      return AdCampaign.find({});
    },
    AdCampaign: (_root, args) => {
      return AdCampaign.findById(args.id);
    },
  },
  Mutation: {
    createAdCampaign: (_root, args) => {
      return AdCampaign.create(args.input);
    },
    updateAdCampaign: (_root, args) => {
      return AdCampaign.findByIdAndUpdate(args.id, args.input, { runValidators: true, new: true });
    },
    deleteAdCampaign: (_root, args) => {
      return AdCampaign.findByIdAndDelete(args.id);
    },
  },
};

export const typeDef = `
extend type Query {
  allAdCampaign: [AdCampaign]
  AdCampaign(id: ID!): AdCampaign
}

extend type Mutation {
  createAdCampaign(input: AdCampaignInput!): AdCampaign
  updateAdCampaign(id: ID!, input: AdCampaignInput): AdCampaign
  deleteAdCampaign(id: ID!): AdCampaign
}

input AdCampaignInput {
  owningCompany: ID
  owningShop: ID
}

type AdCampaign {
  _id: ID!
  owningCompany: Company!
  owningShop: Shop!
  createdAt: Date!
  updatedAt: Date!
}`;
