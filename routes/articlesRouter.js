const {
  getArticles,
  getArticleById,
  patchArticleById,
  postArticle,
  deleteArticleByArticleId,
} = require("../controllers/articlesController");
const {
  getCommentsByArticleId,
  postCommentByArticleId,
} = require("../controllers/commentsController");

const articleRouter = require("express").Router();

articleRouter.route("/").get(getArticles).post(postArticle);

articleRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .delete(deleteArticleByArticleId);

articleRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId);

module.exports = articleRouter;
