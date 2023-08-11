const getTopics = require("../controllers/topicsController");

const topicRouter = require("express").Router();

topicRouter.get("/", getTopics);

module.exports = topicRouter;
