const express = require("express");
const router = express.Router();
const { updateOwnFranchiseDetails } = require("../../controllers/franchiseController");
const {
  authenticateAdmin,
  authorizeRole,
} = require("../../middleware/checkAuth");

router.put(
  "/update-franchise-own-details",
  authenticateAdmin,
  authorizeRole(["franchise"]),
  updateOwnFranchiseDetails
);
module.exports = router;
