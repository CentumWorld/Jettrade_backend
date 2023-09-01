const express = require("express");
const router = express.Router();
const { getFranchiseOwnUpi } = require("../../controllers/franchiseController");
const {authenticateAdmin, authorizeRole}= require("../../middleware/checkAuth")
router.post("/get-franchise-own-upi",authenticateAdmin,
authorizeRole(["franchise"])
,getFranchiseOwnUpi);

module.exports = router