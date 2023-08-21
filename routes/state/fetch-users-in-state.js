const express = require("express");
const router = express.Router();
const {  getAllUsersInState } = require("../../controllers/stateController");
const {
  authenticateState,
  authorizeState,
} = require("../../middleware/checkAuth");
router.get(
  "/fetch-all-users-in-state",
  authenticateState,
  authorizeState,
  getAllUsersInState
);
module.exports = router;
