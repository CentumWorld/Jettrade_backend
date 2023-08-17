const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/fetch-one-comment",
  authenticateUser,
  authorizeUser,
  userController.fetchOnecomment
);

module.exports = router;
