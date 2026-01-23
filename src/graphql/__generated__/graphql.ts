/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  uuid: { input: any; output: any; }
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "colors" */
export type Colors = {
  __typename?: 'colors';
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "colors". All fields are combined with a logical 'AND'. */
export type Colors_Bool_Exp = {
  _and?: InputMaybe<Array<Colors_Bool_Exp>>;
  _not?: InputMaybe<Colors_Bool_Exp>;
  _or?: InputMaybe<Array<Colors_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "colors" */
export enum Colors_Constraint {
  /** unique or primary key constraint on columns "id" */
  ColorsPkey = 'colors_pkey'
}

/** input type for inserting data into table "colors" */
export type Colors_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** response of any mutation on the table "colors" */
export type Colors_Mutation_Response = {
  __typename?: 'colors_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Colors>;
};

/** on_conflict condition type for table "colors" */
export type Colors_On_Conflict = {
  constraint: Colors_Constraint;
  update_columns?: Array<Colors_Update_Column>;
  where?: InputMaybe<Colors_Bool_Exp>;
};

/** Ordering options when selecting data from "colors". */
export type Colors_Order_By = {
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: colors */
export type Colors_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "colors" */
export enum Colors_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "colors" */
export type Colors_Set_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "colors" */
export type Colors_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Colors_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Colors_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "colors" */
export enum Colors_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

export type Colors_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Colors_Set_Input>;
  /** filter the rows which have to be updated */
  where: Colors_Bool_Exp;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** insert data into the table: "colors" */
  insert_colors?: Maybe<Colors_Mutation_Response>;
  /** insert a single row into the table: "colors" */
  insert_colors_one?: Maybe<Colors>;
  /** update data of the table: "colors" */
  update_colors?: Maybe<Colors_Mutation_Response>;
  /** update single row of the table: "colors" */
  update_colors_by_pk?: Maybe<Colors>;
  /** update multiples rows of table: "colors" */
  update_colors_many?: Maybe<Array<Maybe<Colors_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootInsert_ColorsArgs = {
  objects: Array<Colors_Insert_Input>;
  on_conflict?: InputMaybe<Colors_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Colors_OneArgs = {
  object: Colors_Insert_Input;
  on_conflict?: InputMaybe<Colors_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_ColorsArgs = {
  _set?: InputMaybe<Colors_Set_Input>;
  where: Colors_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Colors_By_PkArgs = {
  _set?: InputMaybe<Colors_Set_Input>;
  pk_columns: Colors_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Colors_ManyArgs = {
  updates: Array<Colors_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "colors" */
  colors: Array<Colors>;
  /** fetch data from the table: "colors" using primary key columns */
  colors_by_pk?: Maybe<Colors>;
};


export type Query_RootColorsArgs = {
  distinct_on?: InputMaybe<Array<Colors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Colors_Order_By>>;
  where?: InputMaybe<Colors_Bool_Exp>;
};


export type Query_RootColors_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "colors" */
  colors: Array<Colors>;
  /** fetch data from the table: "colors" using primary key columns */
  colors_by_pk?: Maybe<Colors>;
  /** fetch data from the table in a streaming manner: "colors" */
  colors_stream: Array<Colors>;
};


export type Subscription_RootColorsArgs = {
  distinct_on?: InputMaybe<Array<Colors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Colors_Order_By>>;
  where?: InputMaybe<Colors_Bool_Exp>;
};


export type Subscription_RootColors_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootColors_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Colors_Stream_Cursor_Input>>;
  where?: InputMaybe<Colors_Bool_Exp>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

export type AddColorMutationVariables = Exact<{
  object: Colors_Insert_Input;
}>;


export type AddColorMutation = { __typename?: 'mutation_root', insert_colors_one?: { __typename?: 'colors', id: any, name: string } | null };

export type GetAllColorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllColorsQuery = { __typename?: 'query_root', colors: Array<{ __typename?: 'colors', id: any, name: string }> };


export const AddColorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addColor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"object"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"colors_insert_input"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_colors_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"Variable","name":{"kind":"Name","value":"object"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AddColorMutation, AddColorMutationVariables>;
export const GetAllColorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllColors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetAllColorsQuery, GetAllColorsQueryVariables>;