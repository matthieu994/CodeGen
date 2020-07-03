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

const columns = [];

module.exports = {
  query,
  columns,
};
