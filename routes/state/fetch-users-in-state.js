const express = require("express");
const router = express.Router();
const {  getAllUsersInState } = require("../../controllers/stateController");
const {
  authenticateAdmin,
  authorizeRole,
} = require("../../middleware/checkAuth");
router.get(
  "/fetch-all-users-in-state",
  authenticateAdmin,authorizeRole(["admin", "state"]),
  getAllUsersInState
);
module.exports = router;
