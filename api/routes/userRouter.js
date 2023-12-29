const express = require("express");
const userRouter = express.Router();
const userControllers = require("../controllers/userControllers");



userRouter.post("/register", userControllers.registerPage);
userRouter.post("/login", userControllers.loginPage);
userRouter.post("/profie", userControllers.profilePage);

module.exports = userRouter;
