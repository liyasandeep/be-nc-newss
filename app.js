const express = require("express");
const getTopics = require("./controllers/topicsController");
const {
  getArticleById,
  patchArticleById,
} = require("./controllers/articlesController");
const getUsers = require("./controllers/usersController.js");
const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);

app.get("/api/users", getUsers);

app.patch("/api/articles/:article_id", patchArticleById);

app.all("*", (req, res) => {
  res.status(404).send({ message: "Invalid Route!" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ message: "Invalid type" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ message: err.message });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  res.status(500).send({ message: "OOPS server error!" });
});
module.exports = app;
