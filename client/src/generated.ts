import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type Folder = {
  __typename?: 'Folder';
  date_created: Scalars['DateTime'];
  date_updated: Scalars['DateTime'];
  done: Scalars['Boolean'];
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  listIds: Array<Scalars['Float']>;
  lists: Array<List>;
  name: Scalars['String'];
  order: Scalars['Float'];
  user: User;
  userId: Scalars['Float'];
};

export type GoogleUserLoginInput = {
  idToken: Scalars['String'];
};

export type List = {
  __typename?: 'List';
  date_created: Scalars['DateTime'];
  date_updated: Scalars['DateTime'];
  done: Scalars['Boolean'];
  folder: Array<Folder>;
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  name: Scalars['String'];
  order: Scalars['Float'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  googleLogin: UserLoginResponse;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationGoogleLoginArgs = {
  data: GoogleUserLoginInput;
};

export type Query = {
  __typename?: 'Query';
  getUsers: Array<User>;
  hello: Scalars['String'];
  isValidUserSession: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  activated: Scalars['Boolean'];
  date_created: Scalars['DateTime'];
  date_updated: Scalars['DateTime'];
  defaultFolder: Folder;
  email: Scalars['String'];
  firstName: Scalars['String'];
  folders: Array<Folder>;
  googleUserSub: Scalars['String'];
  id: Scalars['ID'];
  inbox: List;
  isDeleted: Scalars['Boolean'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  userSessions: Array<UserSession>;
};

export type UserLoginResponse = {
  __typename?: 'UserLoginResponse';
  accessToken: Scalars['String'];
  defaultFolder: Scalars['Float'];
  inbox: Scalars['Float'];
};

export type UserSession = {
  __typename?: 'UserSession';
  date_created: Scalars['DateTime'];
  date_updated: Scalars['DateTime'];
  id: Scalars['ID'];
  isRevoked: Scalars['Boolean'];
  user: User;
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: string }> };

export type IsValidUserSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type IsValidUserSessionQuery = { __typename?: 'Query', isValidUserSession: boolean };

export type GoogleLoginMutationVariables = Exact<{
  data: GoogleUserLoginInput;
}>;


export type GoogleLoginMutation = { __typename?: 'Mutation', googleLogin: { __typename?: 'UserLoginResponse', accessToken: string, defaultFolder: number, inbox: number } };


export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const IsValidUserSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsValidUserSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isValidUserSession"}}]}}]} as unknown as DocumentNode<IsValidUserSessionQuery, IsValidUserSessionQueryVariables>;
export const GoogleLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GoogleLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GoogleUserLoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"googleLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"defaultFolder"}},{"kind":"Field","name":{"kind":"Name","value":"inbox"}}]}}]}}]} as unknown as DocumentNode<GoogleLoginMutation, GoogleLoginMutationVariables>;