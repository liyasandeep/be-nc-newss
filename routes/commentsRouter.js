const {
  deleteCommentByCommentId,
} = require("../controllers/commentsController");

const commentRouter = require("express").Router();

commentRouter.delete("/:comment_id", deleteCommentByCommentId);

module.exports = commentRouter;
