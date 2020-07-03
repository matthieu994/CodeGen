// GENERATED BY THE CODEGEN SCRIPT
import React from "react";
import gql from "graphql-tag";
import List, { ColumnRecord } from "../List/List";

const OBJECT = `
_id
firstname
lastname
email
`;

const ALL_QUERY = gql`
  {
    allObjects: allUser {
      ${OBJECT}
    }
  }
`;

const CREATE_MUTATION = gql`
  mutation createUser($input: UserInput!) {
    createObject: createUser(input: $input) {
      ${OBJECT}
    }
  }
`;

const UPDATE_MUTATION = gql`
  mutation updateUser($id: ID!, $input: UserInput) {
    updateObject: updateUser(id: $id, input: $input) {
      ${OBJECT}
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation deleteUser($id: ID!) {
    deleteObject: deleteUser(id: $id) {
      _id
    }
  }
`;

const columns = [
  {
    title: "Email",
    dataIndex: "email",
    editable: true,
    required: true,
  },
  {
    title: "Firstname",
    dataIndex: "firstname",
    editable: true,
    required: true,
  },
  {
    title: "Lastname",
    dataIndex: "lastname",
    editable: true,
    required: true,
  },
  {
    title: "",
    key: "action",
  },
] as Array<ColumnRecord>;

export default function UserRoute(): JSX.Element {
  return (
    <List
      columns={columns}
      all={ALL_QUERY}
      create={CREATE_MUTATION}
      update={UPDATE_MUTATION}
      delete={DELETE_MUTATION}
      disableCreate={true}
    />
  );
}
