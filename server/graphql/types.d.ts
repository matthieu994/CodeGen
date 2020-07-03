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
  getCurrentUser?: Maybe<User>;
  allUser?: Maybe<Array<Maybe<User>>>;
  User?: Maybe<User>;
};


type QueryUserArgs = {
  id: Scalars['ID'];
};

type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  createUser?: Maybe<User>;
  updateUser?: Maybe<User>;
  deleteUser?: Maybe<User>;
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


type UserInput = {
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
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
  type: UserType;
  isValidated: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};
