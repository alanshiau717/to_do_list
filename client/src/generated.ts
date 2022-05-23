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
  DateTime: Date;
};

export type CreateFolderInput = {
  name: Scalars['String'];
};

export type CreateListInput = {
  folder: Scalars['Float'];
  name: Scalars['String'];
};

export type CreateTaskInput = {
  list: Scalars['Float'];
  name: Scalars['String'];
};

export type CreateTaskScheduleInput = {
  endTime: Scalars['DateTime'];
  isAllDayEvent: Scalars['Boolean'];
  startTime: Scalars['DateTime'];
  taskId: Scalars['Float'];
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
  folder: Folder;
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  name: Scalars['String'];
  order: Scalars['Float'];
  tasks: Array<Task>;
  user: User;
};

export type ModificationResponse = {
  __typename?: 'ModificationResponse';
  id: Scalars['Float'];
};

export type ModifyFolderInput = {
  done?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['Float'];
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Float']>;
};

export type ModifyListInput = {
  done?: InputMaybe<Scalars['Boolean']>;
  folderId?: InputMaybe<Scalars['Float']>;
  id: Scalars['Float'];
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Float']>;
};

export type ModifyTaskInput = {
  done?: InputMaybe<Scalars['Boolean']>;
  due?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['Float'];
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  listId?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Float']>;
};

export type ModifyTaskScheduleInput = {
  endTime?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['Float'];
  isAllDayEvent?: InputMaybe<Scalars['Boolean']>;
  startTime?: InputMaybe<Scalars['DateTime']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createFolder: Folder;
  createList: List;
  createTask: Task;
  createTaskSchedule: TaskSchedule;
  createUser: User;
  googleLogin: UserLoginResponse;
  modifyFolder: ModificationResponse;
  modifyList: ModificationResponse;
  modifyTask: ModificationResponse;
  modifyTaskSchedule: ModificationResponse;
};


export type MutationCreateFolderArgs = {
  data: CreateFolderInput;
};


export type MutationCreateListArgs = {
  data: CreateListInput;
};


export type MutationCreateTaskArgs = {
  data: CreateTaskInput;
};


export type MutationCreateTaskScheduleArgs = {
  data: CreateTaskScheduleInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationGoogleLoginArgs = {
  data: GoogleUserLoginInput;
};


export type MutationModifyFolderArgs = {
  data: ModifyFolderInput;
};


export type MutationModifyListArgs = {
  data: ModifyListInput;
};


export type MutationModifyTaskArgs = {
  data: ModifyTaskInput;
};


export type MutationModifyTaskScheduleArgs = {
  data: ModifyTaskScheduleInput;
};

export type Query = {
  __typename?: 'Query';
  folders: Array<Folder>;
  getTaskSchedules: Array<TaskSchedule>;
  getUsers: Array<User>;
  hello: Scalars['String'];
  isValidUserSession: Scalars['Boolean'];
  lists: Array<List>;
};

export type Task = {
  __typename?: 'Task';
  date_created: Scalars['DateTime'];
  date_updated: Scalars['DateTime'];
  done: Scalars['Boolean'];
  due?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  list: List;
  name: Scalars['String'];
  order: Scalars['Float'];
  taskSchedule: Array<TaskSchedule>;
  user: User;
};

export type TaskSchedule = {
  __typename?: 'TaskSchedule';
  date_created: Scalars['DateTime'];
  date_updated: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  id: Scalars['ID'];
  isAllDayEvent: Scalars['Boolean'];
  startTime: Scalars['DateTime'];
  taskId: Scalars['Float'];
  tasks: Task;
  user: User;
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

export type CreateFolderMutationVariables = Exact<{
  data: CreateFolderInput;
}>;


export type CreateFolderMutation = { __typename?: 'Mutation', createFolder: { __typename?: 'Folder', id: string, name: string, done: boolean, isDeleted: boolean, userId: number } };

export type ModifyFolderMutationVariables = Exact<{
  data: ModifyFolderInput;
}>;


export type ModifyFolderMutation = { __typename?: 'Mutation', modifyFolder: { __typename?: 'ModificationResponse', id: number } };

export type CreateListMutationVariables = Exact<{
  data: CreateListInput;
}>;


export type CreateListMutation = { __typename?: 'Mutation', createList: { __typename?: 'List', id: string, name: string, done: boolean, isDeleted: boolean } };

export type ModifyListMutationVariables = Exact<{
  data: ModifyListInput;
}>;


export type ModifyListMutation = { __typename?: 'Mutation', modifyList: { __typename?: 'ModificationResponse', id: number } };

export type CreateTaskMutationVariables = Exact<{
  data: CreateTaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: string, name: string, due?: Date | null, isDeleted: boolean, done: boolean } };

export type ModifyTaskMutationVariables = Exact<{
  data: ModifyTaskInput;
}>;


export type ModifyTaskMutation = { __typename?: 'Mutation', modifyTask: { __typename?: 'ModificationResponse', id: number } };

export type ModifyTaskScheduleMutationVariables = Exact<{
  data: ModifyTaskScheduleInput;
}>;


export type ModifyTaskScheduleMutation = { __typename?: 'Mutation', modifyTaskSchedule: { __typename?: 'ModificationResponse', id: number } };

export type CreateTaskScheduleMutationVariables = Exact<{
  data: CreateTaskScheduleInput;
}>;


export type CreateTaskScheduleMutation = { __typename?: 'Mutation', createTaskSchedule: { __typename?: 'TaskSchedule', id: string, date_created: Date, date_updated: Date, startTime: Date, endTime: Date, isAllDayEvent: boolean, tasks: { __typename?: 'Task', id: string, name: string } } };

export type GetFoldersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFoldersQuery = { __typename?: 'Query', folders: Array<{ __typename?: 'Folder', done: boolean, isDeleted: boolean, name: string, userId: number, _id: string, lists: Array<{ __typename?: 'List', name: string, done: boolean, isDeleted: boolean, _id: string, tasks: Array<{ __typename?: 'Task', name: string, due?: Date | null, isDeleted: boolean, done: boolean, _id: string }> }> }> };

export type GetTaskSchedulesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTaskSchedulesQuery = { __typename?: 'Query', getTaskSchedules: Array<{ __typename?: 'TaskSchedule', id: string, date_created: Date, date_updated: Date, isAllDayEvent: boolean, start: Date, end: Date, tasks: { __typename?: 'Task', name: string, id: string } }> };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: string }> };

export type IsValidUserSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type IsValidUserSessionQuery = { __typename?: 'Query', isValidUserSession: boolean };

export type GoogleLoginMutationVariables = Exact<{
  data: GoogleUserLoginInput;
}>;


export type GoogleLoginMutation = { __typename?: 'Mutation', googleLogin: { __typename?: 'UserLoginResponse', accessToken: string, defaultFolder: number, inbox: number } };


export const CreateFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFolderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"done"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<CreateFolderMutation, CreateFolderMutationVariables>;
export const ModifyFolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ModifyFolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ModifyFolderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"modifyFolder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ModifyFolderMutation, ModifyFolderMutationVariables>;
export const CreateListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateListInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"done"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}}]}}]}}]} as unknown as DocumentNode<CreateListMutation, CreateListMutationVariables>;
export const ModifyListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ModifyList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ModifyListInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"modifyList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ModifyListMutation, ModifyListMutationVariables>;
export const CreateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"due"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}},{"kind":"Field","name":{"kind":"Name","value":"done"}}]}}]}}]} as unknown as DocumentNode<CreateTaskMutation, CreateTaskMutationVariables>;
export const ModifyTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ModifyTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ModifyTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"modifyTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ModifyTaskMutation, ModifyTaskMutationVariables>;
export const ModifyTaskScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ModifyTaskSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ModifyTaskScheduleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"modifyTaskSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ModifyTaskScheduleMutation, ModifyTaskScheduleMutationVariables>;
export const CreateTaskScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTaskSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTaskScheduleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTaskSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date_created"}},{"kind":"Field","name":{"kind":"Name","value":"date_updated"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"isAllDayEvent"}}]}}]}}]} as unknown as DocumentNode<CreateTaskScheduleMutation, CreateTaskScheduleMutationVariables>;
export const GetFoldersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getFolders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"folders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"_id"},"name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"_id"},"name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"_id"},"name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"due"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}},{"kind":"Field","name":{"kind":"Name","value":"done"}}]}},{"kind":"Field","name":{"kind":"Name","value":"done"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}}]}},{"kind":"Field","name":{"kind":"Name","value":"done"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<GetFoldersQuery, GetFoldersQueryVariables>;
export const GetTaskSchedulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTaskSchedules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTaskSchedules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date_created"}},{"kind":"Field","name":{"kind":"Name","value":"date_updated"}},{"kind":"Field","alias":{"kind":"Name","value":"start"},"name":{"kind":"Name","value":"startTime"}},{"kind":"Field","alias":{"kind":"Name","value":"end"},"name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"isAllDayEvent"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetTaskSchedulesQuery, GetTaskSchedulesQueryVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const IsValidUserSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsValidUserSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isValidUserSession"}}]}}]} as unknown as DocumentNode<IsValidUserSessionQuery, IsValidUserSessionQueryVariables>;
export const GoogleLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GoogleLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GoogleUserLoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"googleLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"defaultFolder"}},{"kind":"Field","name":{"kind":"Name","value":"inbox"}}]}}]}}]} as unknown as DocumentNode<GoogleLoginMutation, GoogleLoginMutationVariables>;