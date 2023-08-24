const express = require("express");
const router = express.Router();
const { getOwnStateDetails } = require("../../controllers/stateController");
const {
  authenticateAdmin,
  authorizeRole,
} = require("../../middleware/checkAuth");

router.get(
  "/get-own-state-details",
  authenticateAdmin,
  authorizeRole(["state"]),
  getOwnStateDetails
);
module.exports = router;
