const {
  deleteCommentByCommentId,
  patchCommentByCommentId,
} = require("../controllers/commentsController");

const commentRouter = require("express").Router();

commentRouter.delete("/:comment_id", deleteCommentByCommentId);
commentRouter.patch("/:comment_id", patchCommentByCommentId);

module.exports = commentRouter;
