const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/fetch-user-one-video-dislike",
  authenticateUser,
  authorizeUser,
  userController.fetchUserOneVideoDisLike
);

module.exports = router;
