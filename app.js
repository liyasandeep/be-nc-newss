const express = require("express");
const getTopics = require("./controllers/topicsController");
const getUsers = require("./controllers/usersController.js");
const app = express();

app.get("/api/topics", getTopics);

app.get("/api/users", getUsers);
app.all("*", (req, res) => {
  res.status(404).send({ message: "Invalid Route!" });
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: "OOPS server error!" });
});
module.exports = app;
