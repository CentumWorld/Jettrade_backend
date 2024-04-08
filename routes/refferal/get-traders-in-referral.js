const express = require("express");
const router = express.Router();

const {
  authenticateAdmin,
  authorizeRole,
} = require("../../middleware/checkAuth");
const { getTradersInReferral } = require("../../controllers/memberController");

router.post(
  "/get-traders-in-referral",
  authenticateAdmin,
  authorizeRole(["user", "member"]),
  getTradersInReferral
);

module.exports = router;
