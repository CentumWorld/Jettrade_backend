const express = require("express");
const router = express.Router();
const {  getFranchiseOwnBankDetails } = require("../../controllers/franchiseController");
const {authenticateAdmin, authorizeRole}= require("../../middleware/checkAuth")
router.post("/get-franchise-own-bank-details",authenticateAdmin,
authorizeRole(["franchise"])
,getFranchiseOwnBankDetails);

module.exports = router