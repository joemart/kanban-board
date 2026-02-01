/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation addBoard($object: boards_insert_input!) {\n  insert_boards_one(object: $object) {\n    id\n    name\n  }\n}": typeof types.AddBoardDocument,
    "mutation addColor($object: colors_insert_input!) {\n  insert_colors_one(object: $object) {\n    id\n    name\n  }\n}": typeof types.AddColorDocument,
    "mutation UpdateColumnsOrder($updates: [columns_updates!]!) {\n  update_columns_many(updates: $updates) {\n    affected_rows\n    returning {\n      id\n      board_id\n      name\n      position\n    }\n  }\n}": typeof types.UpdateColumnsOrderDocument,
    "query GetAllBoards {\n  boards {\n    id\n    name\n    position\n    owner\n  }\n}\n\nquery GetBoard($id: uuid!) {\n  boards_by_pk(id: $id) {\n    id\n    name\n    position\n    owner\n  }\n}": typeof types.GetAllBoardsDocument,
    "query GetAllColors {\n  colors {\n    id\n    name\n  }\n}": typeof types.GetAllColorsDocument,
    "query GetAllColumns {\n  columns {\n    board_id\n    id\n    name\n    position\n  }\n}\n\nquery GetColumn($id: uuid!) {\n  columns_by_pk(id: $id) {\n    board_id\n    id\n    name\n    position\n  }\n}": typeof types.GetAllColumnsDocument,
};
const documents: Documents = {
    "mutation addBoard($object: boards_insert_input!) {\n  insert_boards_one(object: $object) {\n    id\n    name\n  }\n}": types.AddBoardDocument,
    "mutation addColor($object: colors_insert_input!) {\n  insert_colors_one(object: $object) {\n    id\n    name\n  }\n}": types.AddColorDocument,
    "mutation UpdateColumnsOrder($updates: [columns_updates!]!) {\n  update_columns_many(updates: $updates) {\n    affected_rows\n    returning {\n      id\n      board_id\n      name\n      position\n    }\n  }\n}": types.UpdateColumnsOrderDocument,
    "query GetAllBoards {\n  boards {\n    id\n    name\n    position\n    owner\n  }\n}\n\nquery GetBoard($id: uuid!) {\n  boards_by_pk(id: $id) {\n    id\n    name\n    position\n    owner\n  }\n}": types.GetAllBoardsDocument,
    "query GetAllColors {\n  colors {\n    id\n    name\n  }\n}": types.GetAllColorsDocument,
    "query GetAllColumns {\n  columns {\n    board_id\n    id\n    name\n    position\n  }\n}\n\nquery GetColumn($id: uuid!) {\n  columns_by_pk(id: $id) {\n    board_id\n    id\n    name\n    position\n  }\n}": types.GetAllColumnsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation addBoard($object: boards_insert_input!) {\n  insert_boards_one(object: $object) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation addBoard($object: boards_insert_input!) {\n  insert_boards_one(object: $object) {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation addColor($object: colors_insert_input!) {\n  insert_colors_one(object: $object) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation addColor($object: colors_insert_input!) {\n  insert_colors_one(object: $object) {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateColumnsOrder($updates: [columns_updates!]!) {\n  update_columns_many(updates: $updates) {\n    affected_rows\n    returning {\n      id\n      board_id\n      name\n      position\n    }\n  }\n}"): (typeof documents)["mutation UpdateColumnsOrder($updates: [columns_updates!]!) {\n  update_columns_many(updates: $updates) {\n    affected_rows\n    returning {\n      id\n      board_id\n      name\n      position\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAllBoards {\n  boards {\n    id\n    name\n    position\n    owner\n  }\n}\n\nquery GetBoard($id: uuid!) {\n  boards_by_pk(id: $id) {\n    id\n    name\n    position\n    owner\n  }\n}"): (typeof documents)["query GetAllBoards {\n  boards {\n    id\n    name\n    position\n    owner\n  }\n}\n\nquery GetBoard($id: uuid!) {\n  boards_by_pk(id: $id) {\n    id\n    name\n    position\n    owner\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAllColors {\n  colors {\n    id\n    name\n  }\n}"): (typeof documents)["query GetAllColors {\n  colors {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAllColumns {\n  columns {\n    board_id\n    id\n    name\n    position\n  }\n}\n\nquery GetColumn($id: uuid!) {\n  columns_by_pk(id: $id) {\n    board_id\n    id\n    name\n    position\n  }\n}"): (typeof documents)["query GetAllColumns {\n  columns {\n    board_id\n    id\n    name\n    position\n  }\n}\n\nquery GetColumn($id: uuid!) {\n  columns_by_pk(id: $id) {\n    board_id\n    id\n    name\n    position\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;