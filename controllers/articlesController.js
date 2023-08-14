const {
  selectArticleById,
  updateArticleById,
  selectArticles,
  insertArticle,
  removeArticleByArticleId,
} = require("../models/articlesModel");

const { selectTopicByName } = require("../models/topicsModel");

const getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

const patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  updateArticleById(article_id, inc_votes)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
const getArticles = (req, res, next) => {
  const { sort_by, order, topic, limit, p } = req.query;

  const promises = [selectArticles(topic, sort_by, order, limit, p)];
  if (topic) {
    promises.push(selectTopicByName(topic));
  }

  Promise.all(promises)
    .then((promises) => {
      const [articles, topic] = promises;
      res.status(200).send({ articles: articles });
    })
    .catch((err) => {
      next(err);
    });
};

const postArticle = (req, res, next) => {
  const { author, title, body, topic } = req.body;
  const requestLength = Object.keys(req.body).length;

  insertArticle(author, title, body, topic, requestLength)
    .then((article) => {
      res.status(201).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

const deleteArticleByArticleId = (req, res, next) => {
  const { article_id } = req.params;

  removeArticleByArticleId(article_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getArticleById,
  patchArticleById,
  getArticles,
  postArticle,
  deleteArticleByArticleId,
};
