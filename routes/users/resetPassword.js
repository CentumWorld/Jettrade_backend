const express = require("express");
const connection = require("../../database/conn");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userController = require("../../controllers/userController");
const {authenticateUser,
    authorizeUser,} = require("../../middleware/checkAuth");

router.post("/resetPassword", authenticateUser,
authorizeUser,userController.resetPassword);

module.exports = router;
