const {
  selectArticleById,
  updateArticleById,
  selectArticles,
} = require("../models/articlesModel");

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
  selectArticles(topic)
    .then((articles) => {
      if (articles.length !== 0) {
        res.status(200).send({ articles });
      } else {
        res.status(400).send({ message: "Invalid query type" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getArticleById, patchArticleById, getArticles };
