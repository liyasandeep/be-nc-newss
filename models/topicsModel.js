const db = require("../db/connection");

const selectTopics = () => {
  console.log("in model");

  let queryStr = ` SELECT * FROM topics; `;

  return db.query(queryStr).then(({ rows: topics }) => {
    console.log(topics);
    return topics;
  });
};

module.exports = selectTopics;
