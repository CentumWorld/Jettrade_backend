const express = require("express");
const router = express.Router();
const { fetchStateNotification } = require("../../controllers/stateController");
const {
  authenticateAdmin,
  authorizeRole,
} = require("../../middleware/checkAuth");
router.post(
  "/state/fetch-state-notification"
  ,authenticateAdmin,authorizeRole(["state"]),
  fetchStateNotification
);
module.exports = router;
