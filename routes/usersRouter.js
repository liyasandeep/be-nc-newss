const getUsers = require("../controllers/usersController");

const userRouter = require("express").Router();

userRouter.get("/", getUsers);

module.exports = userRouter;
