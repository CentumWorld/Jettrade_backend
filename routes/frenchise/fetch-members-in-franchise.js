const express = require("express");
const router = express.Router();
const { getMembersInFranchise } = require("../../controllers/franchiseController");
const {authenticateAdmin, authorizeRole}= require("../../middleware/checkAuth")
router.post("/get-all-members-in-franchise",authenticateAdmin,
authorizeRole(["admin", "franchise"])
,getMembersInFranchise);

module.exports = router