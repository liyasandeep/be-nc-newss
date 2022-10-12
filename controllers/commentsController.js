const selectCommentsByArticleId = require("../models/commentsModel.js");

const { selectArticleById } = require("../models/articlesModel");
const getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;

  selectArticleById(article_id)
    .then((article) => {
      return selectCommentsByArticleId(article_id);
    })
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = getCommentsByArticleId;
