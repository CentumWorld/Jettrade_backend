const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");
const { authenticateAdmin, authorizeRole } = require("../middleware/checkAuth");

router.get(
  "/total_Count_Of_Payment_Status_Of_User",
  authenticateAdmin,
  authorizeRole(["admin", "subAdmin"]),
  adminController.totalCountOfPaymentStatusOfUser
);

module.exports = router;
