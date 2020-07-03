// GENERATED BY THE CODEGEN SCRIPT
import React from "react";
import gql from "graphql-tag";
import List, { ColumnRecord } from "../List/List";

const OBJECT = `
  _id
  name
  number
  owner {
    _id
    firstname
    lastname
  }
`;

const ALL_QUERY = gql`
  {
    allObjects: allTest {
      ${OBJECT}
    }
    users: allUser {
    _id
	    firstname
	    lastname
}
  }
`;

const CREATE_MUTATION = gql`
  mutation createTest($input: TestInput!) {
    createObject: createTest(input: $input) {
      ${OBJECT}
    }
  }
`;

const UPDATE_MUTATION = gql`
  mutation updateTest($id: ID!, $input: TestInput) {
    updateObject: updateTest(id: $id, input: $input) {
      ${OBJECT}
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation deleteTest($id: ID!) {
    deleteObject: deleteTest(id: $id) {
      _id
    }
  }
`;

const columns = [
  {
  title: 'Name',
  dataIndex: 'name',
  sorter: (a: any, b: any) => a.name.localeCompare(b.name),
  editable: true,
  required: true
},{ title: 'Number', dataIndex: 'number', editable: true },{
  title: 'Owner',
  dataIndex: 'owner',
  render: (user: any) => `${user.firstname} ${user.lastname}`,
  sorter: (a: any, b: any) =>
      (a.owner.firstname + a.owner.lastname).localeCompare(b.owner.firstname + b.owner.lastname),
  required: true,
  editable: true,
  queryIndex: 'users'
},
  {
    title: "",
    key: "action",
  },
] as Array<ColumnRecord>;

export default function TestRoute(): JSX.Element {
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
