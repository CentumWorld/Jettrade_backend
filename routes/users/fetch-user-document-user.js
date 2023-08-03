const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/fetch-user-document-user",
  authenticateUser,
  authorizeUser,
  userController.fetchUserDocumentUser
);

module.exports = router;
