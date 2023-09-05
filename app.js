const express = require("express");
const cors = require("cors");
const path = require("path");

const apiRouter = require("./routes/apiRouter");
const {
  handlePSQLErrors,
  handleCustomErrors,
  handleServerErrors,
  handleInvalidRouteErrors,
} = require("./controllers/errorsController");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public", "build", "index.html"));
});

app.use("/api", apiRouter);

app.all("*", handleInvalidRouteErrors);
app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
