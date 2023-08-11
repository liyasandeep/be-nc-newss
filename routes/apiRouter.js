const apiRouter = require("express").Router();

const endpoints = require("../endpoints.json");
const articleRouter = require("./articlesRouter");
const commentRouter = require("./commentsRouter");
const topicRouter = require("./topicsRouter");
const userRouter = require("./usersRouter");

apiRouter.get("/", (req, res) => {
  res.status(200).send({ endpoints });
});

apiRouter.use("/users", userRouter);

apiRouter.use("/topics", topicRouter);

apiRouter.use("/articles", articleRouter);

apiRouter.use("/comments", commentRouter);

module.exports = apiRouter;
