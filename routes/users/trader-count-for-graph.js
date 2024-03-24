const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.post(
  "/trader-count-for-graph",
  authenticateUser,
  authorizeUser,

  userController.traderCountForGraph
);

module.exports = router;
