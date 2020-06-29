import React from "react";
import gql from "graphql-tag";
import { User, Company } from "../graphql/types.d";
import { SortOrder } from "antd/lib/table/interface";
import List from "../List/List";

const COMPANY = `
_id
name
businessOfficialId
vatNumber
owningUser {
  _id
  firstname
  lastname
}`;

const ALL_QUERY = gql`
  {
    allObjects: allCompany {
      ${COMPANY}
    }
    users: allUser {
      _id
      firstname
      lastname
    }
  }
`;

const CREATE_MUTATION = gql`
  mutation createCompany($input: CompanyInput!) {
    createObject: createCompany(input: $input) {
      ${COMPANY}
    }
  }
`;

const UPDATE_MUTATION = gql`
  mutation updateCompany($id: ID!, $input: CompanyInput) {
    updateObject: updateCompany(id: $id, input: $input) {
      ${COMPANY}
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation deleteCompany($id: ID!) {
    deleteObject: deleteCompany(id: $id) {
      _id
    }
  }
`;

const columns = [
  {
    title: "Company Name", // Displayed name
    dataIndex: "name", // To retrieve GraphQL data
    defaultSortOrder: "ascend" as SortOrder,
    sorter: (a: Company, b: Company): number => a.name.localeCompare(b.name),
    editable: true,
    required: true,
  },
  {
    title: "Business ID",
    dataIndex: "businessOfficialId",
    editable: true,
  },
  {
    title: "VAT Number",
    dataIndex: "vatNumber",
    editable: true,
  },
  {
    title: "Owning User",
    dataIndex: "owningUser",
    render: (user: User): string => `${user.firstname} ${user.lastname}`,
    sorter: (a: Company, b: Company): number =>
      (a.owningUser.firstname + a.owningUser.lastname).localeCompare(
        b.owningUser.firstname + b.owningUser.lastname
      ),
    required: true,
    editable: true,
    queryIndex: "users",
  },
  {
    title: "",
    key: "action",
  },
];

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
