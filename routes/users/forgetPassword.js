const express = require("express");
const connection = require("../../database/conn");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userController = require("../../controllers/userController");
const {authenticateUser,
    authorizeUser,} = require("../../middleware/checkAuth");

router.post("/forgetPassword",authenticateUser,
authorizeUser, userController.forgetPassword);

module.exports = router;
