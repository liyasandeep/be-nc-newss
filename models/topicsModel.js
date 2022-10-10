const db = require("../db/connection");

const selectTopics = () => {
  let queryStr = ` SELECT * FROM topics; `;

  return db.query(queryStr).then(({ rows: topics }) => {
    return topics;
  });
};

module.exports = selectTopics;
