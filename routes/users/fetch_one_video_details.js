const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/fetch_one_video",
  authenticateUser,
  authorizeUser,
  userController.fetchOneVideoDetail
);

module.exports = router;
