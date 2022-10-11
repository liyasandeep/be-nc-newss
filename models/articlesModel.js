const db = require("../db/connection");

const selectArticleById = (article_id) => {
  let queryStr = `SELECT articles.* ,COUNT(comments.article_id) ::INT AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id =$1 GROUP BY articles.article_id;`;

  return db.query(queryStr, [article_id]).then(({ rows: article }) => {
    if (article.length === 1) {
      return article[0];
    } else {
      return Promise.reject({
        status: 404,
        message: "Article Id does not exist",
      });
    }
  });
};

module.exports = selectArticleById;
