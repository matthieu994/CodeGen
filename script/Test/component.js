const query = `
  _id
  name
  number
  owner {
    _id
    firstname
    lastname
  }
`;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    editable: true,
    required: true,
  },
  {
    title: "Number",
    dataIndex: "number",
    editable: true,
  },
  {
    title: "Owner",
    dataIndex: "owner",
    render: (user) => `${user.firstname} ${user.lastname}`,
    sorter: (a, b) =>
      (a.owner.firstname + a.owner.lastname).localeCompare(b.owner.firstname + b.owner.lastname),
    required: true,
    editable: true,
    queryIndex: "users",
  },
];

module.exports = {
  query,
  columns,
};
