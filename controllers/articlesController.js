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
  const { sort_by, order, topic } = req.query;
  console.log(sort_by, order, topic);

  const promises = [selectArticles(topic, sort_by, order)];
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

module.exports = { getArticleById, patchArticleById, getArticles };
