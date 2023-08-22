const express = require("express");
const router = express.Router();
const { getBusinessDevelopersInFranchise } = require("../../controllers/franchiseController");
const {authenticateAdmin, authorizeRole}= require("../../middleware/checkAuth")
router.post("/get-all-business-developer-in-franchise",authenticateAdmin,
authorizeRole(["admin", "franchise"])
,getBusinessDevelopersInFranchise);

module.exports = router