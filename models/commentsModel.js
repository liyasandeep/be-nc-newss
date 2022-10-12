const db = require("../db/connection.js");

const selectCommentsByArticleId = (article_id) => {
  const query_str = `SELECT comment_id,votes,created_at,author,body FROM comments WHERE article_id =$1 ORDER BY created_at DESC;`;
  return db.query(query_str, [article_id]).then(({ rows: comments }) => {
    if (comments.length === 0) {
      return Promise.reject({
        status: 404,
        message: "Article Id not found",
      });
    }
    return comments;
  });
};

const insertCommentByArticleId = (article_id, username, body) => {
  if (!body) {
    return Promise.reject({ status: 400, message: "Missing body" });
  }
  let queryStr = `INSERT INTO comments(body,article_id,author) VALUES ($1, $2, $3) RETURNING *;`;

  return db
    .query(queryStr, [body, article_id, username])
    .then(({ rows: [comment] }) => {
      return comment;
    });
};

module.exports = { selectCommentsByArticleId, insertCommentByArticleId };
