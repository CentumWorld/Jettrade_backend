const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
  authenticateAdmin,
  authorizeRole,
} = require("../../middleware/checkAuth");

router.post(
  "/trader-count-for-graph",
  authenticateAdmin,
  authorizeRole(["user", "member"]),

  userController.traderCountForGraph
);

module.exports = router;
