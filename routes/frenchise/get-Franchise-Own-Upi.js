const express = require("express");
const router = express.Router();
const { getFranchiseOwnUpi } = require("../../controllers/franchiseController");
const {authenticateAdmin, authorizeRole}= require("../../middleware/checkAuth")
router.post("/get-franchise-own-upi",authenticateAdmin,
authorizeRole(["franchise", "admin"])
,getFranchiseOwnUpi);

module.exports = router