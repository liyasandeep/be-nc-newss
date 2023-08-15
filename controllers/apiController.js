const getApiEndpoints = require("../models/apiModel");

const getEndpoints = (req, res) => {
  const endpoints = getApiEndpoints();
  res.status(200).send({ endpoints });
};
module.exports = getEndpoints;
