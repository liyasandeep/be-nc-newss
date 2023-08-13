const db = require("../db/connection.js");

const selectCommentsByArticleId = (article_id) => {
  const query_str = `SELECT article_id,comment_id,votes,created_at,author,body FROM comments WHERE article_id =$1 ORDER BY created_at DESC;`;
  return db.query(query_str, [article_id]).then(({ rows: comments }) => {
    return comments;
  });
};

const insertCommentByArticleId = (
  article_id,
  username,
  body,
  requestLength
) => {
  if (!body) {
    return Promise.reject({ status: 400, message: "Missing body" });
  }

  if (requestLength > 2) {
    return Promise.reject({ status: 400, message: "Invalid Input" });
  }
  let queryStr = `INSERT INTO comments(body,article_id,author) VALUES ($1, $2, $3) RETURNING *;`;

  return db
    .query(queryStr, [body, article_id, username])
    .then(({ rows: [comment] }) => {
      return comment;
    });
};

const removeCommentByCommentId = (comment_id) => {
  let queryStr = ` DELETE FROM comments WHERE comment_id = $1;`;
  return db.query(queryStr, [comment_id]).then(({ rowCount }) => {
    if (rowCount === 0) {
      return Promise.reject({ status: 404, message: "Id not found" });
    }
    return;
  });
};

const updateCommentByCommentId = (comment_id, inc_votes) => {
  if (inc_votes === undefined) {
    return Promise.reject({ status: 400, message: "Invalid key" });
  } else {
    let queryStr = `UPDATE comments SET  votes = votes + $2 WHERE comment_id = $1 RETURNING *; `;

    return db
      .query(queryStr, [comment_id, inc_votes])
      .then(({ rows: comment }) => {
        if (comment.length === 1) {
          return comment[0];
        } else {
          return Promise.reject({
            status: 404,
            message: "Comment Id does not exist",
          });
        }
      });
  }
};

module.exports = {
  selectCommentsByArticleId,
  insertCommentByArticleId,
  removeCommentByCommentId,
  updateCommentByCommentId,
};
