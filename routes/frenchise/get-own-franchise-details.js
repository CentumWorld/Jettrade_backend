const express = require("express");
const router = express.Router();
const { getOwnFranchiseDetails } = require("../../controllers/franchiseController");
const {authenticateAdmin, authorizeRole}= require("../../middleware/checkAuth")
router.get("/get-own-franchise-details",authenticateAdmin,
authorizeRole(["franchise"])
,getOwnFranchiseDetails);

module.exports = router