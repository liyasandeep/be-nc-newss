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

const updateArticleById = (article_id, inc_votes) => {
  if (inc_votes === undefined) {
    return Promise.reject({ status: 400, message: "Invalid key" });
  } else {
    let queryStr = `UPDATE articles SET  votes = votes + $2 WHERE article_id = $1 RETURNING *; `;

    return db
      .query(queryStr, [article_id, inc_votes])
      .then(({ rows: article }) => {
        if (article.length === 1) {
          return article[0];
        } else {
          return Promise.reject({
            status: 404,
            message: "Article Id does not exist",
          });
        }
      });
  }
};

const selectArticles = (topic) => {
  let queryStr = `SELECT articles.article_id, articles.author,title,topic,articles.created_at,articles.votes,COUNT(comments.article_id) ::INT AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id `;

  let queryValues = [];

  if (topic) {
    queryValues.push(topic);

    queryStr += `WHERE topic = $1 `;
  }

  queryStr += `GROUP BY articles.article_id ORDER BY articles.created_at DESC`;

  return db.query(queryStr, queryValues).then(({ rows: articles }) => {
    return articles;
  });
};
module.exports = { selectArticleById, updateArticleById, selectArticles };
