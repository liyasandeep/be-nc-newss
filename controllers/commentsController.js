const {
  selectCommentsByArticleId,
  insertCommentByArticleId,
} = require("../models/commentsModel.js");

const { selectArticleById } = require("../models/articlesModel");

const { selectUserByUsername } = require("../models/usersModel");
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

const postCommentByArticleId = (req, res, next) => {
  console.log("in controller");
  const { article_id } = req.params;
  const { username, body } = req.body;

  selectUserByUsername(username)
    .then((username) => {
      return selectArticleById(article_id);
    })
    .then(({ rows: article }) => {
      return insertCommentByArticleId(article_id, username, body);
    })
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

module.exports = { getCommentsByArticleId, postCommentByArticleId };
