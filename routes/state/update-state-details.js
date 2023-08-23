const express = require("express");
const router = express.Router();
const { updateStateDetails } = require("../../controllers/stateController");
const {
  authenticateAdmin,
  authorizeRole,
} = require("../../middleware/checkAuth");

router.put(
  "/update-state-details",
  authenticateAdmin,
  authorizeRole(["state"]),
  updateStateDetails
);
module.exports = router;
