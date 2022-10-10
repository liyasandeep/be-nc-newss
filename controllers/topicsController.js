const selectTopics = require("../models/topicsModel");
const getTopics = (req, res, next) => {
  console.log("in controller");

  selectTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = getTopics;
