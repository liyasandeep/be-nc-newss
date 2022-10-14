const db = require("../db/connection.js");
const selectCommentsByArticleId = (article_id) => {
  const query_str = `SELECT comment_id,votes,created_at,author,body FROM comments WHERE article_id =$1 ORDER BY created_at DESC;`;
  return db.query(query_str, [article_id]).then(({ rows: comments }) => {
    return comments;
  });
};

module.exports = selectCommentsByArticleId;
