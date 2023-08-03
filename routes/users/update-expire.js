const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/users/update-expire",
  authenticateUser,
  authorizeUser,
  userController.updateExpireUser
);

module.exports = router;
