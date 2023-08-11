const {
  getArticles,
  getArticleById,
  patchArticleById,
} = require("../controllers/articlesController");
const {
  getCommentsByArticleId,
  postCommentByArticleId,
} = require("../controllers/commentsController");

const articleRouter = require("express").Router();

articleRouter.get("/", getArticles);

articleRouter.route("/:article_id").get(getArticleById).patch(patchArticleById);

articleRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId);

module.exports = articleRouter;
