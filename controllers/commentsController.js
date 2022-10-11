const selectCommentsByArticleId = require("../models/commentsModel.js");
const getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  console.log(article_id);
  selectCommentsByArticleId(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = getCommentsByArticleId;
