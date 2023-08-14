const { selectTopics, insertTopic } = require("../models/topicsModel");
const getTopics = (req, res, next) => {
  selectTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

const postTopic = (req, res, next) => {
  const { slug, description } = req.body;
  const requestLength = Object.keys(req.body).length;

  insertTopic(slug, description, requestLength)
    .then((topic) => {
      res.status(201).send({ topic });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getTopics, postTopic };
