const {
  selectArticleById,
  updateArticleById,
  selectArticles,
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
  const { topic } = req.query;

  const promises = [selectArticles(topic)];
  if (topic) {
    promises.push(selectTopicByName(topic));
  }

  Promise.all(promises)
    .then((promises) => {
      res.status(200).send({ articles: promises[0] });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getArticleById, patchArticleById, getArticles };
