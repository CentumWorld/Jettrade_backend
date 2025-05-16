const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const { authenticateAdmin, authorizeRole } = require("../middleware/checkAuth");

router.post(
  "/admin-activate-withdrawal-message",
  authenticateAdmin,
  authorizeRole(["admin"]),
  adminController.adminActivateWithdrawalMessage
);

module.exports = router;