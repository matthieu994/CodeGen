import React from "react";
import gql from "graphql-tag";
import { User, Shop, Company } from "../graphql/types.d";
import { SortOrder } from "antd/lib/table/interface";
import List from "../List/List";

const SHOP = `
_id
name
owningUser {
  _id
  firstname
  lastname
}
owningCompany {
  _id
  name
}
address
location {
  type
  coordinates
}
screens {
  _id
  sshUsername
}
ticketScanners {
  _id
}
`;

const ALL_QUERY = gql`
  {
    allObjects: allShop {
      ${SHOP}
    }
    users: allUser {
      _id
      firstname
      lastname
    }
    companies: allCompany {
      _id
      name
    }
    screens: allScreen {
      _id
      sshUsername
    }
    ticketScanners: allTicketScanner {
      _id
    }
  }
`;

const CREATE_MUTATION = gql`
  mutation createShop($input: ShopInput!) {
    createObject: createShop(input: $input) {
      ${SHOP}
    }
  }
`;

const UPDATE_MUTATION = gql`
  mutation updateShop($id: ID!, $input: ShopInput) {
    updateObject: updateShop(id: $id, input: $input) {
      ${SHOP}
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation deleteShop($id: ID!) {
    deleteObject: deleteShop(id: $id) {
      _id
    }
  }
`;

const columns = [
  {
    title: "Shop Name", // Displayed name
    dataIndex: "name", // To retrieve GraphQL data
    defaultSortOrder: "ascend" as SortOrder,
    sorter: (a: Shop, b: Shop): number => a.name.localeCompare(b.name),
    editable: true,
    required: true,
  },
  {
    title: "Owning User",
    dataIndex: "owningUser",
    render: (user: User): string => `${user.firstname} ${user.lastname}`,
    sorter: (a: Shop, b: Shop): number =>
      (a.owningUser.firstname + a.owningUser.lastname).localeCompare(
        b.owningUser.firstname + b.owningUser.lastname
      ),
    required: true,
    editable: true,
    queryIndex: "users",
  },
  {
    title: "Owning Company",
    dataIndex: "owningCompany",
    render: (company: Company): string => `${company.name}`,
    sorter: (a: Shop, b: Shop): number => a.owningCompany.name.localeCompare(b.owningCompany.name),
    required: true,
    editable: true,
    queryIndex: "companies",
  },
  {
    title: "Address",
    dataIndex: "address",
    required: true,
    editable: true,
  },
  {
    title: "Location",
    dataIndex: "location",
    required: true,
    editable: true,
    type: "location",
  },
  {
    title: "Screens",
    dataIndex: "screens",
    required: true,
    editable: true,
    type: "screen[]",
    queryIndex: "screens",
  },
  {
    title: "Ticket Scanners",
    dataIndex: "ticketScanners",
    required: true,
    editable: true,
    type: "ticketScanner[]",
    queryIndex: "ticketScanners",
  },
  {
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
