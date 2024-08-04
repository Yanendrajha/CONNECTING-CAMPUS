const express = require('express');
const router = express.Router();
const userControllers = require("../controllers/user");
const middleWares = require("../middlewares/index");

router.post("/signup", userControllers.signupUser);

router.post("/login", userControllers.login);

router.post("/logout",middleWares.isLoggedIn, userControllers.logout);

router.get("/all",middleWares.isLoggedIn, userControllers.getAllUsers);

module.exports = router
