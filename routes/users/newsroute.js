const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");

router.get("/fetchnews", userController.getNews);

module.exports = router;
