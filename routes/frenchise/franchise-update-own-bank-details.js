const express = require("express");
const router = express.Router();

const {
    franchieUpdateOwnbankDetails,
} = require("../../controllers/franchiseController");
const {
  authenticateAdmin,
  authorizeRole,
} = require("../../middleware/checkAuth");
router.post(
  "/frenchise/franchise-update-own-bank-details",
  authenticateAdmin,
  authorizeRole(["franchise"]),
  franchieUpdateOwnbankDetails
);
module.exports = router;
