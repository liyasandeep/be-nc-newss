const {
  selectCommentsByArticleId,
  insertCommentByArticleId,
  removeCommentByCommentId,
} = require("../models/commentsModel.js");

const { selectArticleById } = require("../models/articlesModel");

const { selectUserByUsername } = require("../models/usersModel");

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

const postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  const promises = [
    selectArticleById(article_id),
    selectUserByUsername(username),
  ];
  if (username) {
    promises.push(insertCommentByArticleId(article_id, username, body));
  }
  Promise.all(promises)
    .then((promisesResultArr) => {
      const [article, username, comment] = promisesResultArr;
      res.status(201).send({ comment });
    })

    .catch((err) => {
      next(err);
    });
};
const deleteCommentByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentByCommentId(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = {
  getCommentsByArticleId,
  postCommentByArticleId,
  deleteCommentByCommentId,
};
