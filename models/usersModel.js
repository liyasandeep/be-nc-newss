const db = require("../db/connection");

const selectUsers = () => {
  let queryStr = `SELECT * FROM users;`;

  return db.query(queryStr).then(({ rows: users }) => {
    return users;
  });
};

module.exports = selectUsers;
