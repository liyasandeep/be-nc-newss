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

const insertTopic = (slug, description, requestLength) => {
  if (!slug || !description || requestLength > 2) {
    return Promise.reject({ status: 400, message: "Invalid Input" });
  }
  let queryStr = ` INSERT INTO topics(slug,description) VALUES ($1,$2) RETURNING *; `;

  return db.query(queryStr, [slug, description]).then(({ rows: [topic] }) => {
    return topic;
  });
};

module.exports = { selectTopics, selectTopicByName, insertTopic };
