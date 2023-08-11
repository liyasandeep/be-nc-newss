const db = require("../db/connection");

const selectUsers = () => {
  let queryStr = `SELECT * FROM users;`;

  return db.query(queryStr).then(({ rows: users }) => {
    return users;
  });
};

const selectUserByUsername = (username) => {
  if (username) {
    let queryStr = `SELECT * FROM users WHERE username = $1;`;

    return db.query(queryStr, [username]).then(({ rows: user }) => {
      if (user.length === 1) {
        return user[0];
      } else {
        return Promise.reject({ status: 404, message: "Username not found" });
      }
    });
  }
  return Promise.reject({ status: 400, message: "Missing username" });
};

module.exports = { selectUsers, selectUserByUsername };
