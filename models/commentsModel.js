const db = require("../db/connection.js");
const selectCommentsByArticleId = (article_id) => {
  const query_str = `SELECT comment_id,votes,created_at,author,body FROM comments WHERE article_id =$1 ORDER BY created_at DESC;`;
  return db.query(query_str, [article_id]).then(({ rows: comments }) => {
    console.log(comments);
    if (comments.length === 0) {
      return Promise.reject({
        status: 404,
        message: "Article Id not found",
      });
    }
    return comments;
  });
};

module.exports = selectCommentsByArticleId;
