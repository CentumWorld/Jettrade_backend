const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const passwordController = require("../../controllers/passwordController");


router.post("/passwordChange/allPasswordChange",passwordController.allPasswordChange);

module.exports = router;
