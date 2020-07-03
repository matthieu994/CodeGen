const query = `
_id
name
businessOfficialId
vatNumber
owningUser {
  _id
  firstname
  lastname
}`;

const columns = [
  {
    title: "Company Name", // Displayed name
    dataIndex: "name", // To retrieve GraphQL data
    defaultSortOrder: "ascend",
    sorter: (a, b) => a.name.localeCompare(b.name),
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
    render: (user) => `${user.firstname} ${user.lastname}`,
    sorter: (a, b) =>
      (a.owningUser.firstname + a.owningUser.lastname).localeCompare(
        b.owningUser.firstname + b.owningUser.lastname
      ),
    required: true,
    editable: true,
    queryIndex: "users",
  },
];

module.exports = {
  query,
  columns,
};
