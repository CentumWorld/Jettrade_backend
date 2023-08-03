const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/users/update-day-count",
  authenticateUser,
  authorizeUser,
  userController.updateDayCount
);

module.exports = router;
