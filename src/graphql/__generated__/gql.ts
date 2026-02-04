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
    "mutation UpdateColumnsOrder($updates: [columns_updates!]!) {\n  update_columns_many(updates: $updates) {\n    returning {\n      id\n      board_id\n      name\n      position\n    }\n  }\n}\n\nmutation InsertOneColumn($object: columns_insert_input!) {\n  insert_columns_one(object: $object) {\n    id\n    board_id\n    name\n    position\n  }\n}\n\nmutation DeleteColumnByID($id: uuid!) {\n  delete_columns_by_pk(id: $id) {\n    id\n    board_id\n    name\n    position\n  }\n}\n\nmutation UpdateOneColumn($id: uuid!, $update: columns_set_input!) {\n  update_columns_by_pk(pk_columns: {id: $id}, _set: $update) {\n    id\n    board_id\n    name\n    position\n  }\n}\n\nmutation AddColumn {\n  insert_columns_one(\n    object: {board_id: \"54b42903-5ab6-44bf-a516-307330136295\", name: \"ASDF\", position: 5}\n  ) {\n    id\n    name\n    board_id\n    position\n  }\n}": typeof types.UpdateColumnsOrderDocument,
    "query GetAllBoards {\n  boards {\n    id\n    name\n    position\n    owner\n  }\n}\n\nquery GetBoard($id: uuid!) {\n  boards_by_pk(id: $id) {\n    id\n    name\n    position\n    owner\n  }\n}": typeof types.GetAllBoardsDocument,
    "query GetAllColors {\n  colors {\n    id\n    name\n  }\n}": typeof types.GetAllColorsDocument,
    "query GetAllColumns {\n  columns {\n    board_id\n    id\n    name\n    position\n  }\n}\n\nquery GetColumn($id: uuid!) {\n  columns_by_pk(id: $id) {\n    board_id\n    id\n    name\n    position\n  }\n}": typeof types.GetAllColumnsDocument,
    "query GetAllMutations {\n  __type(name: \"mutation_root\") {\n    name\n    fields {\n      name\n      description\n      args {\n        name\n        type {\n          name\n          kind\n        }\n      }\n    }\n  }\n}": typeof types.GetAllMutationsDocument,
};
const documents: Documents = {
    "mutation addBoard($object: boards_insert_input!) {\n  insert_boards_one(object: $object) {\n    id\n    name\n  }\n}": types.AddBoardDocument,
    "mutation addColor($object: colors_insert_input!) {\n  insert_colors_one(object: $object) {\n    id\n    name\n  }\n}": types.AddColorDocument,
    "mutation UpdateColumnsOrder($updates: [columns_updates!]!) {\n  update_columns_many(updates: $updates) {\n    returning {\n      id\n      board_id\n      name\n      position\n    }\n  }\n}\n\nmutation InsertOneColumn($object: columns_insert_input!) {\n  insert_columns_one(object: $object) {\n    id\n    board_id\n    name\n    position\n  }\n}\n\nmutation DeleteColumnByID($id: uuid!) {\n  delete_columns_by_pk(id: $id) {\n    id\n    board_id\n    name\n    position\n  }\n}\n\nmutation UpdateOneColumn($id: uuid!, $update: columns_set_input!) {\n  update_columns_by_pk(pk_columns: {id: $id}, _set: $update) {\n    id\n    board_id\n    name\n    position\n  }\n}\n\nmutation AddColumn {\n  insert_columns_one(\n    object: {board_id: \"54b42903-5ab6-44bf-a516-307330136295\", name: \"ASDF\", position: 5}\n  ) {\n    id\n    name\n    board_id\n    position\n  }\n}": types.UpdateColumnsOrderDocument,
    "query GetAllBoards {\n  boards {\n    id\n    name\n    position\n    owner\n  }\n}\n\nquery GetBoard($id: uuid!) {\n  boards_by_pk(id: $id) {\n    id\n    name\n    position\n    owner\n  }\n}": types.GetAllBoardsDocument,
    "query GetAllColors {\n  colors {\n    id\n    name\n  }\n}": types.GetAllColorsDocument,
    "query GetAllColumns {\n  columns {\n    board_id\n    id\n    name\n    position\n  }\n}\n\nquery GetColumn($id: uuid!) {\n  columns_by_pk(id: $id) {\n    board_id\n    id\n    name\n    position\n  }\n}": types.GetAllColumnsDocument,
    "query GetAllMutations {\n  __type(name: \"mutation_root\") {\n    name\n    fields {\n      name\n      description\n      args {\n        name\n        type {\n          name\n          kind\n        }\n      }\n    }\n  }\n}": types.GetAllMutationsDocument,
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
export function graphql(source: "mutation UpdateColumnsOrder($updates: [columns_updates!]!) {\n  update_columns_many(updates: $updates) {\n    returning {\n      id\n      board_id\n      name\n      position\n    }\n  }\n}\n\nmutation InsertOneColumn($object: columns_insert_input!) {\n  insert_columns_one(object: $object) {\n    id\n    board_id\n    name\n    position\n  }\n}\n\nmutation DeleteColumnByID($id: uuid!) {\n  delete_columns_by_pk(id: $id) {\n    id\n    board_id\n    name\n    position\n  }\n}\n\nmutation UpdateOneColumn($id: uuid!, $update: columns_set_input!) {\n  update_columns_by_pk(pk_columns: {id: $id}, _set: $update) {\n    id\n    board_id\n    name\n    position\n  }\n}\n\nmutation AddColumn {\n  insert_columns_one(\n    object: {board_id: \"54b42903-5ab6-44bf-a516-307330136295\", name: \"ASDF\", position: 5}\n  ) {\n    id\n    name\n    board_id\n    position\n  }\n}"): (typeof documents)["mutation UpdateColumnsOrder($updates: [columns_updates!]!) {\n  update_columns_many(updates: $updates) {\n    returning {\n      id\n      board_id\n      name\n      position\n    }\n  }\n}\n\nmutation InsertOneColumn($object: columns_insert_input!) {\n  insert_columns_one(object: $object) {\n    id\n    board_id\n    name\n    position\n  }\n}\n\nmutation DeleteColumnByID($id: uuid!) {\n  delete_columns_by_pk(id: $id) {\n    id\n    board_id\n    name\n    position\n  }\n}\n\nmutation UpdateOneColumn($id: uuid!, $update: columns_set_input!) {\n  update_columns_by_pk(pk_columns: {id: $id}, _set: $update) {\n    id\n    board_id\n    name\n    position\n  }\n}\n\nmutation AddColumn {\n  insert_columns_one(\n    object: {board_id: \"54b42903-5ab6-44bf-a516-307330136295\", name: \"ASDF\", position: 5}\n  ) {\n    id\n    name\n    board_id\n    position\n  }\n}"];
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
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAllMutations {\n  __type(name: \"mutation_root\") {\n    name\n    fields {\n      name\n      description\n      args {\n        name\n        type {\n          name\n          kind\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query GetAllMutations {\n  __type(name: \"mutation_root\") {\n    name\n    fields {\n      name\n      description\n      args {\n        name\n        type {\n          name\n          kind\n        }\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;