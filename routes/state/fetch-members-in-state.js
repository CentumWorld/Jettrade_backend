const express = require("express");
const router = express.Router();
const { getAllMembersInState } = require("../../controllers/stateController");
const {
  authenticateState,
  authorizeState,
} = require("../../middleware/checkAuth");
router.get(
  "/fetch-all-members-in-state",
  authenticateState,
  authorizeState,
  getAllMembersInState
);
module.exports = router;
