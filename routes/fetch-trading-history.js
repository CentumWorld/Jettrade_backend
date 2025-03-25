const express = require("express");
const connection = require("../database/conn");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { authenticateAdmin, authorizeRole } = require("../middleware/checkAuth");
const adminController = require("../controllers/adminController");

router.post(
  "/fetch-trading-history",
  authenticateAdmin,
  authorizeRole(["admin", "subAdmin"]),
  adminController.fetchTradingHistory
);

module.exports = router;