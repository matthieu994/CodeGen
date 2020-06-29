/* eslint-disable */
import gql from 'graphql-tag';
export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  allAdCampaign?: Maybe<Array<Maybe<AdCampaign>>>;
  AdCampaign?: Maybe<AdCampaign>;
  allAlgoScoring?: Maybe<Array<Maybe<AlgoScoring>>>;
  AlgoScoring?: Maybe<AlgoScoring>;
  allBrand?: Maybe<Array<Maybe<Brand>>>;
  Brand?: Maybe<Brand>;
  allCompany?: Maybe<Array<Maybe<Company>>>;
  Company?: Maybe<Company>;
  allProduct?: Maybe<Array<Maybe<Product>>>;
  Product?: Maybe<Product>;
  allScreen?: Maybe<Array<Maybe<Screen>>>;
  Screen?: Maybe<Screen>;
  allReport?: Maybe<Array<Maybe<Report>>>;
  Report?: Maybe<Report>;
  allReportEvent?: Maybe<Array<Maybe<ReportEvent>>>;
  ReportEvent?: Maybe<ReportEvent>;
  allViewer?: Maybe<Array<Maybe<Viewer>>>;
  Viewer?: Maybe<Viewer>;
  allShop?: Maybe<Array<Maybe<Shop>>>;
  Shop?: Maybe<Shop>;
  allTicket?: Maybe<Array<Maybe<Ticket>>>;
  Ticket?: Maybe<Ticket>;
  allTicketScanner?: Maybe<Array<Maybe<TicketScanner>>>;
  TicketScanner?: Maybe<TicketScanner>;
  hello?: Maybe<Scalars['String']>;
  getCurrentUser?: Maybe<User>;
  allUser?: Maybe<Array<Maybe<User>>>;
  User?: Maybe<User>;
};


export type QueryAdCampaignArgs = {
  id: Scalars['ID'];
};


export type QueryAlgoScoringArgs = {
  id: Scalars['ID'];
};


export type QueryBrandArgs = {
  id: Scalars['ID'];
};


export type QueryCompanyArgs = {
  id: Scalars['ID'];
};


export type QueryProductArgs = {
  id: Scalars['ID'];
};


export type QueryScreenArgs = {
  id: Scalars['ID'];
};


export type QueryReportArgs = {
  id: Scalars['ID'];
};


export type QueryReportEventArgs = {
  id: Scalars['ID'];
};


export type QueryViewerArgs = {
  id: Scalars['ID'];
};


export type QueryShopArgs = {
  id: Scalars['ID'];
};


export type QueryTicketArgs = {
  id: Scalars['ID'];
};


export type QueryTicketScannerArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  createAdCampaign?: Maybe<AdCampaign>;
  updateAdCampaign?: Maybe<AdCampaign>;
  deleteAdCampaign?: Maybe<AdCampaign>;
  createAlgoScoring?: Maybe<AlgoScoring>;
  updateAlgoScoring?: Maybe<AlgoScoring>;
  deleteAlgoScoring?: Maybe<AlgoScoring>;
  createBrand?: Maybe<Brand>;
  updateBrand?: Maybe<Brand>;
  deleteBrand?: Maybe<Brand>;
  createCompany?: Maybe<Company>;
  updateCompany?: Maybe<Company>;
  deleteCompany?: Maybe<Company>;
  createProduct?: Maybe<Product>;
  updateProduct?: Maybe<Product>;
  deleteProduct?: Maybe<Product>;
  createScreen?: Maybe<Screen>;
  updateScreen?: Maybe<Screen>;
  deleteScreen?: Maybe<Screen>;
  createReport?: Maybe<Report>;
  updateReport?: Maybe<Report>;
  deleteReport?: Maybe<Report>;
  createReportEvent?: Maybe<ReportEvent>;
  updateReportEvent?: Maybe<ReportEvent>;
  deleteReportEvent?: Maybe<ReportEvent>;
  createViewer?: Maybe<Viewer>;
  updateViewer?: Maybe<Viewer>;
  deleteViewer?: Maybe<Viewer>;
  createShop?: Maybe<Shop>;
  updateShop?: Maybe<Shop>;
  deleteShop?: Maybe<Shop>;
  createTicket?: Maybe<Ticket>;
  updateTicket?: Maybe<Ticket>;
  deleteTicket?: Maybe<Ticket>;
  createTicketScanner?: Maybe<TicketScanner>;
  updateTicketScanner?: Maybe<TicketScanner>;
  deleteTicketScanner?: Maybe<TicketScanner>;
  createUser?: Maybe<User>;
  updateUser?: Maybe<User>;
  deleteUser?: Maybe<User>;
};


export type MutationCreateAdCampaignArgs = {
  input: AdCampaignInput;
};


export type MutationUpdateAdCampaignArgs = {
  id: Scalars['ID'];
  input?: Maybe<AdCampaignInput>;
};


export type MutationDeleteAdCampaignArgs = {
  id: Scalars['ID'];
};


export type MutationCreateAlgoScoringArgs = {
  input: AlgoScoringInput;
};


export type MutationUpdateAlgoScoringArgs = {
  id: Scalars['ID'];
  input?: Maybe<AlgoScoringInput>;
};


export type MutationDeleteAlgoScoringArgs = {
  id: Scalars['ID'];
};


export type MutationCreateBrandArgs = {
  input: BrandInput;
};


export type MutationUpdateBrandArgs = {
  id: Scalars['ID'];
  input?: Maybe<BrandInput>;
};


export type MutationDeleteBrandArgs = {
  id: Scalars['ID'];
};


export type MutationCreateCompanyArgs = {
  input: CompanyInput;
};


export type MutationUpdateCompanyArgs = {
  id: Scalars['ID'];
  input?: Maybe<CompanyInput>;
};


export type MutationDeleteCompanyArgs = {
  id: Scalars['ID'];
};


export type MutationCreateProductArgs = {
  input: ProductInput;
};


export type MutationUpdateProductArgs = {
  id: Scalars['ID'];
  input?: Maybe<ProductInput>;
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID'];
};


export type MutationCreateScreenArgs = {
  input: ScreenInput;
};


export type MutationUpdateScreenArgs = {
  id: Scalars['ID'];
  input?: Maybe<ScreenInput>;
};


export type MutationDeleteScreenArgs = {
  id: Scalars['ID'];
};


export type MutationCreateReportArgs = {
  input: ReportInput;
};


export type MutationUpdateReportArgs = {
  id: Scalars['ID'];
  input?: Maybe<ReportInput>;
};


export type MutationDeleteReportArgs = {
  id: Scalars['ID'];
};


export type MutationCreateReportEventArgs = {
  input: ReportEventInput;
};


export type MutationUpdateReportEventArgs = {
  id: Scalars['ID'];
  input?: Maybe<ReportEventInput>;
};


export type MutationDeleteReportEventArgs = {
  id: Scalars['ID'];
};


export type MutationCreateViewerArgs = {
  input: ViewerInput;
};


export type MutationUpdateViewerArgs = {
  id: Scalars['ID'];
  input?: Maybe<ViewerInput>;
};


export type MutationDeleteViewerArgs = {
  id: Scalars['ID'];
};


export type MutationCreateShopArgs = {
  input?: Maybe<ShopInput>;
};


export type MutationUpdateShopArgs = {
  id: Scalars['ID'];
  input?: Maybe<ShopInput>;
};


export type MutationDeleteShopArgs = {
  id: Scalars['ID'];
};


export type MutationCreateTicketArgs = {
  input: TicketInput;
};


export type MutationUpdateTicketArgs = {
  id: Scalars['ID'];
  input?: Maybe<TicketInput>;
};


export type MutationDeleteTicketArgs = {
  id: Scalars['ID'];
};


export type MutationCreateTicketScannerArgs = {
  input: TicketScannerInput;
};


export type MutationUpdateTicketScannerArgs = {
  id: Scalars['ID'];
  input?: Maybe<TicketScannerInput>;
};


export type MutationDeleteTicketScannerArgs = {
  id: Scalars['ID'];
};


export type MutationCreateUserArgs = {
  input?: Maybe<UserInput>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input?: Maybe<UserInput>;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type AdCampaignInput = {
  owningCompany?: Maybe<Scalars['ID']>;
  owningShop?: Maybe<Scalars['ID']>;
};

export type AdCampaign = {
  __typename?: 'AdCampaign';
  _id: Scalars['ID'];
  owningCompany: Company;
  owningShop: Shop;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type AlgoScoringInput = {
  url?: Maybe<Scalars['String']>;
};

export type AlgoScoring = {
  __typename?: 'AlgoScoring';
  _id: Scalars['ID'];
  url: Scalars['String'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type BrandInput = {
  name?: Maybe<Scalars['String']>;
  owningCompany?: Maybe<Scalars['ID']>;
};

export type Brand = {
  __typename?: 'Brand';
  _id: Scalars['ID'];
  name: Scalars['String'];
  owningCompany?: Maybe<Company>;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type CompanyInput = {
  name?: Maybe<Scalars['String']>;
  owningUser?: Maybe<Scalars['ID']>;
  businessOfficialId?: Maybe<Scalars['String']>;
  vatNumber?: Maybe<Scalars['String']>;
};

export type Company = {
  __typename?: 'Company';
  _id: Scalars['ID'];
  name: Scalars['String'];
  owningUser: User;
  businessOfficialId?: Maybe<Scalars['String']>;
  vatNumber?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type ProductInput = {
  name?: Maybe<Scalars['String']>;
  owningCompany: Scalars['ID'];
  owningBrand: Scalars['ID'];
};

export type Product = {
  __typename?: 'Product';
  _id: Scalars['ID'];
  name: Scalars['String'];
  owningCompany?: Maybe<Company>;
  owningBrand?: Maybe<Brand>;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type ScreenInput = {
  owningShop?: Maybe<Scalars['ID']>;
  owningUser?: Maybe<Scalars['ID']>;
  owningCompany?: Maybe<Scalars['ID']>;
  associatedUser?: Maybe<Scalars['ID']>;
  sshUsername?: Maybe<Scalars['String']>;
  sshPem?: Maybe<Scalars['String']>;
  proofOfViewability?: Maybe<Array<Maybe<Scalars['String']>>>;
  surroundingProducts?: Maybe<Array<Maybe<Scalars['ID']>>>;
  prefetchedAlgos?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type Screen = {
  __typename?: 'Screen';
  _id: Scalars['ID'];
  owningShop: Shop;
  owningUser: User;
  owningCompany: Company;
  associatedUser: User;
  sshUsername: Scalars['String'];
  sshPem: Scalars['String'];
  proofOfViewability: Array<Scalars['String']>;
  surroundingProducts: Array<Product>;
  prefetchedAlgos: Array<AlgoScoring>;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type ReportInput = {
  reportEvents?: Maybe<Array<Maybe<Scalars['ID']>>>;
  owningScreen?: Maybe<Scalars['ID']>;
  reportAlgoVersion?: Maybe<Scalars['Float']>;
};

export type Report = {
  __typename?: 'Report';
  _id: Scalars['ID'];
  reportEvents: Array<ReportEvent>;
  owningScreen: Screen;
  reportAlgoVersion: Scalars['Float'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type ReportEventInput = {
  timestamp?: Maybe<Scalars['Int']>;
  adCampaignId?: Maybe<Scalars['ID']>;
  viewers?: Maybe<Array<Maybe<Scalars['ID']>>>;
  startDisplay?: Maybe<Scalars['Boolean']>;
  endDisplay?: Maybe<Scalars['Boolean']>;
};

export type ReportEvent = {
  __typename?: 'ReportEvent';
  _id: Scalars['ID'];
  timestamp: Scalars['Int'];
  adCampaignId: AdCampaign;
  viewers: Array<Viewer>;
  startDisplay?: Maybe<Scalars['Boolean']>;
  endDisplay?: Maybe<Scalars['Boolean']>;
};

export type ViewerInput = {
  views?: Maybe<Array<Maybe<ViewInput>>>;
  boxes?: Maybe<Array<Maybe<BoxInput>>>;
  gender?: Maybe<Gender>;
  age?: Maybe<Scalars['Float']>;
  fashionId?: Maybe<Scalars['Float']>;
};

export type ViewInput = {
  start: Scalars['Float'];
  end: Scalars['Float'];
};

export type PointInput = {
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type BoxInput = {
  timestamp: Scalars['Float'];
  topLeft: PointInput;
  bottomRight: PointInput;
};

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE'
}

export type View = {
  __typename?: 'View';
  start: Scalars['Float'];
  end: Scalars['Float'];
};

export type Point = {
  __typename?: 'Point';
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type Box = {
  __typename?: 'Box';
  timestamp: Scalars['Float'];
  topLeft: Point;
  bottomRight: Point;
};

export type Viewer = {
  __typename?: 'Viewer';
  _id: Scalars['ID'];
  views: Array<View>;
  boxes: Array<Box>;
  gender: Gender;
  age: Scalars['Float'];
  fashionId: Scalars['Float'];
};

export type ShopInput = {
  name?: Maybe<Scalars['String']>;
  owningUser?: Maybe<Scalars['ID']>;
  owningCompany?: Maybe<Scalars['ID']>;
  address?: Maybe<Scalars['String']>;
  location?: Maybe<LocationInput>;
  screens?: Maybe<Array<Maybe<Scalars['ID']>>>;
  ticketScanners?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type LocationInput = {
  type: Scalars['String'];
  coordinates: Array<Scalars['Float']>;
};

export type Location = {
  __typename?: 'Location';
  type: Scalars['String'];
  coordinates: Array<Scalars['Float']>;
};

export type Shop = {
  __typename?: 'Shop';
  _id: Scalars['ID'];
  name: Scalars['String'];
  owningUser: User;
  owningCompany: Company;
  address: Scalars['String'];
  location: Location;
  screens: Array<Screen>;
  ticketScanners: Array<TicketScanner>;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type TicketInput = {
  boughtItems?: Maybe<Array<Maybe<BoughtItemInput>>>;
  owningCompany?: Maybe<Scalars['ID']>;
  owningBrand?: Maybe<Scalars['ID']>;
  owningTicketScanner?: Maybe<Scalars['ID']>;
};

export type BoughtItemInput = {
  productName: Scalars['String'];
  productId: Scalars['ID'];
  price: Scalars['Float'];
};

export type BoughtItem = {
  __typename?: 'BoughtItem';
  productName: Scalars['String'];
  productId: Scalars['ID'];
  price: Scalars['Float'];
};

export type Ticket = {
  __typename?: 'Ticket';
  _id: Scalars['ID'];
  boughtItems: Array<BoughtItem>;
  owningCompany: Company;
  owningBrand: Brand;
  owningTicketScanner: TicketScanner;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type TicketScannerInput = {
  owningCompany?: Maybe<Scalars['ID']>;
  owningShop?: Maybe<Scalars['ID']>;
};

export type TicketScanner = {
  __typename?: 'TicketScanner';
  _id: Scalars['ID'];
  owningCompany: Company;
  owningShop: Shop;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type UserInput = {
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  type?: Maybe<UserType>;
};

export enum UserType {
  SuperAdmin = 'SUPER_ADMIN',
  Eam = 'EAM',
  Sam = 'SAM',
  Screen = 'SCREEN',
  TicketScanner = 'TICKET_SCANNER'
}

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  graphqlField?: Maybe<Scalars['String']>;
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  type: UserType;
  isValidated: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};


