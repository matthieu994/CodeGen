// GENERATED BY THE CODEGEN SCRIPT
import React from "react";
import gql from "graphql-tag";
import List, { ColumnRecord } from "../List/List";

const OBJECT = $OBJECT;

const ALL_QUERY = gql`
  {
    allObjects: allObject {
      ${OBJECT}
    }
    $GRAPHQL_ADD_QUERY
  }
`;

const CREATE_MUTATION = gql`
  mutation createObject($input: ObjectInput!) {
    createObject: createObject(input: $input) {
      ${OBJECT}
    }
  }
`;

const UPDATE_MUTATION = gql`
  mutation updateObject($id: ID!, $input: ObjectInput) {
    updateObject: updateObject(id: $id, input: $input) {
      ${OBJECT}
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation deleteObject($id: ID!) {
    deleteObject: deleteObject(id: $id) {
      _id
    }
  }
`;

const columns = [
  $COLUMNS,
  {
    title: "",
    key: "action",
  },
] as Array<ColumnRecord>;

export default function ObjectRoute(): JSX.Element {
  return (
    <List
      columns={columns}
      all={ALL_QUERY}
      create={CREATE_MUTATION}
      update={UPDATE_MUTATION}
      delete={DELETE_MUTATION}
    />
  );
}
