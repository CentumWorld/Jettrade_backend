const express = require("express");
const router = express.Router();
const { getAllMembersInState } = require("../../controllers/stateController");
const {
  authenticateAdmin,
  authorizeRole,
} = require("../../middleware/checkAuth");
router.post(
  "/fetch-all-members-in-state"
  ,authenticateAdmin,authorizeRole(["admin", "state"]),
  getAllMembersInState
);
module.exports = router;
