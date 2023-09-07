const express = require("express");
const router = express.Router();

const {
  authenticateAdmin,
  authorizeRole,
} = require("../../middleware/checkAuth");

const {
  eligibleBusinessDeveloperForWithdrawal,
} = require("../../controllers/businessDevController");
router.post(
  "/eligible-business-developer-for-withdrawal",
  authenticateAdmin,
  authorizeRole(["businessDeveloper"]),
  eligibleBusinessDeveloperForWithdrawal
);
module.exports = router;
