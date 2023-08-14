const db = require("../db/connection");
const { selectUserByUsername } = require("../models/usersModel");

const { selectTopicByName } = require("../models/topicsModel");
const articles = require("../db/data/test-data/articles");

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

const selectArticles = (
  topic,
  sort_by = "created_at",
  order = "desc",
  limit = 10,
  p = 1
) => {
  const validSortValues = [
    "title",
    "topic",
    "author",
    "body",
    "created_at",
    "votes",
    "comment_count",
  ];
  const validOrderValues = ["asc", "desc"];

  const offset = (p - 1) * limit;
  if (!validSortValues.includes(sort_by)) {
    return Promise.reject({ status: 400, message: "Invalid column" });
  }

  if (!validOrderValues.includes(order)) {
    return Promise.reject({ status: 400, message: "Invalid order" });
  }

  if (isNaN(limit)) {
    return Promise.reject({ status: 400, message: "invalid limit query" });
  }

  if (isNaN(p)) {
    return Promise.reject({ status: 400, message: "invalid page query" });
  }

  let queryStr = `SELECT articles.article_id, articles.author,title,topic,articles.created_at,articles.votes,COUNT(comments.article_id) ::INT AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id `;

  let total_countQueryStr = `SELECT COUNT(*)::INT FROM articles`;

  let queryValues = [];

  if (topic) {
    queryValues.push(topic);

    queryStr += ` WHERE topic = $1 `;
    total_countQueryStr += ` WHERE topic = $1 `;
  }

  queryStr += `GROUP BY articles.article_id ORDER BY ${sort_by} ${order} LIMIT ${limit} OFFSET ${offset}`;

  return db
    .query(queryStr, queryValues)
    .then(({ rows: articles }) => {
      return Promise.all([
        articles,
        db.query(total_countQueryStr, queryValues),
      ]);
    })
    .then(([articles, { rows }]) => {
      articles.forEach((article) => (article.total_count = rows[0].count));
      return articles;
    });
};

const insertArticle = (author, title, body, topic, requestLength) => {
  if (!body || !author || !title || !topic || requestLength > 4) {
    return Promise.reject({ status: 400, message: "Invalid Input" });
  }

  const promises = [selectUserByUsername(author), selectTopicByName(topic)];

  return Promise.all(promises)
    .then((promiseArr) => {
      const [authorValues, topicValues] = promiseArr;
      let queryStr = `INSERT INTO articles(author,title,body,topic) VALUES ($1, $2, $3,$4) RETURNING *;`;
      return db.query(queryStr, [
        authorValues.username,
        title,
        body,
        topicValues.slug,
      ]);
    })
    .then(({ rows: [article] }) => {
      const article_id = article.article_id;
      return article_id;
    })
    .then((article_id) => {
      return selectArticleById(article_id);
    })
    .then((article) => {
      return article;
    });
};
module.exports = {
  selectArticleById,
  updateArticleById,
  selectArticles,
  insertArticle,
};
