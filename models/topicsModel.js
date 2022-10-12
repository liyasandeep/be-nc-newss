const db = require("../db/connection");

const selectTopics = () => {
  let queryStr = ` SELECT * FROM topics; `;

  return db.query(queryStr).then(({ rows: topics }) => {
    return topics;
  });
};
const selectTopicByName = (topic) => {
  return db
    .query(`SELECT * FROM topics WHERE slug = $1`, [topic])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "Topic not found" });
      }
      return rows[0];
    });
};

module.exports = { selectTopics, selectTopicByName };
