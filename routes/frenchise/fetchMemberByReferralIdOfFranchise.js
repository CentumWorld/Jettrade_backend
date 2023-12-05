const express = require("express");
const router = express.Router();
const { fetchMemberByReferralIdOfFranchise } = require("../../controllers/franchiseController");
const {authenticateAdmin, authorizeRole}= require("../../middleware/checkAuth")
router.post("/fetch-member-by-referral-id-Of-franchise",authenticateAdmin,
authorizeRole([ "franchise"])
,fetchMemberByReferralIdOfFranchise);

module.exports = router