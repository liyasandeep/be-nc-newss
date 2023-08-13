const {
  getArticles,
  getArticleById,
  patchArticleById,
  postArticle,
} = require("../controllers/articlesController");
const {
  getCommentsByArticleId,
  postCommentByArticleId,
} = require("../controllers/commentsController");

const articleRouter = require("express").Router();

articleRouter.route("/").get(getArticles).post(postArticle);

articleRouter.route("/:article_id").get(getArticleById).patch(patchArticleById);

articleRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId);

module.exports = articleRouter;
