const db = require("../db/connection");

const selectArticleById = (article_id) => {
  console.log("in model");
  let queryStr = `SELECT * FROM articles WHERE articles.article_id = $1; `;

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
