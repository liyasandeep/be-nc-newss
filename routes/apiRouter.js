const apiRouter = require("express").Router();

const getEndpoints = require("../controllers/apiController");
const articleRouter = require("./articlesRouter");
const commentRouter = require("./commentsRouter");
const topicRouter = require("./topicsRouter");
const userRouter = require("./usersRouter");

apiRouter.get("/", getEndpoints);

apiRouter.use("/users", userRouter);

apiRouter.use("/topics", topicRouter);

apiRouter.use("/articles", articleRouter);

apiRouter.use("/comments", commentRouter);

module.exports = apiRouter;
