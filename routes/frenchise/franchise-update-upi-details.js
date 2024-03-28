const express = require("express");
const router = express.Router();

const {
    franchiseUpdateUpiDetails,
} = require("../../controllers/franchiseController");
const {
  authenticateAdmin,
  authorizeRole,
} = require("../../middleware/checkAuth");
router.post(
  "/frenchise/franchise-update-upi-details",
  authenticateAdmin,
  authorizeRole(["franchise"]),
  franchiseUpdateUpiDetails
);
module.exports = router;
