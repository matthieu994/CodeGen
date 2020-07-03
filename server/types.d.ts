/* eslint-disable */
type Maybe<T> = T | null;
type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };

/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
};

type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  allCompany?: Maybe<Array<Maybe<Company>>>;
  Company?: Maybe<Company>;
  allTest?: Maybe<Array<Maybe<Test>>>;
  Test?: Maybe<Test>;
  getCurrentUser?: Maybe<User>;
  allUser?: Maybe<Array<Maybe<User>>>;
  User?: Maybe<User>;
};


type QueryCompanyArgs = {
  id: Scalars['ID'];
};


type QueryTestArgs = {
  id: Scalars['ID'];
};


type QueryUserArgs = {
  id: Scalars['ID'];
};

type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  createCompany?: Maybe<Company>;
  updateCompany?: Maybe<Company>;
  deleteCompany?: Maybe<Company>;
  createTest?: Maybe<Test>;
  updateTest?: Maybe<Test>;
  deleteTest?: Maybe<Test>;
  createUser?: Maybe<User>;
  updateUser?: Maybe<User>;
  deleteUser?: Maybe<User>;
};


type MutationCreateCompanyArgs = {
  input: CompanyInput;
};


type MutationUpdateCompanyArgs = {
  id: Scalars['ID'];
  input?: Maybe<CompanyInput>;
};


type MutationDeleteCompanyArgs = {
  id: Scalars['ID'];
};


type MutationCreateTestArgs = {
  input: TestInput;
};


type MutationUpdateTestArgs = {
  id: Scalars['ID'];
  input?: Maybe<TestInput>;
};


type MutationDeleteTestArgs = {
  id: Scalars['ID'];
};


type MutationCreateUserArgs = {
  input?: Maybe<UserInput>;
};


type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input?: Maybe<UserInput>;
};


type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


type CompanyInput = {
  name?: Maybe<Scalars['String']>;
  owningUser?: Maybe<Scalars['ID']>;
  businessOfficialId?: Maybe<Scalars['String']>;
  vatNumber?: Maybe<Scalars['String']>;
};

type Company = {
  __typename?: 'Company';
  _id: Scalars['ID'];
  name: Scalars['String'];
  owningUser: User;
  businessOfficialId?: Maybe<Scalars['String']>;
  vatNumber?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

type TestInput = {
  name?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['ID']>;
  number?: Maybe<Scalars['Int']>;
};

type Test = {
  __typename?: 'Test';
  _id: Scalars['ID'];
  name: Scalars['String'];
  owner: User;
  number?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

type UserInput = {
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  type?: Maybe<UserType>;
};

enum UserType {
  Admin = 'ADMIN',
  User = 'USER'
}

type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
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
