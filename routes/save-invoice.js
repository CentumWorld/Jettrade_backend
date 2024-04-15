const express = require("express");
const router = express.Router();
const upload = require("../utils/aws");

const {
  authenticateAdmin,
  authorizeRole,
} = require("../middleware/checkAuth");
const { saveInvoice } = require("../controllers/adminController");

router.post(
  "/save-invoice",
  upload.fields([{ name: "invoice", maxCount: 1 }]),
  authenticateAdmin,
  authorizeRole(["admin", "subAdmin"]),
  saveInvoice
);

module.exports = router;
