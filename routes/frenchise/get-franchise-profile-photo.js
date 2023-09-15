const express = require("express");
const router = express.Router();
const { getFranchiseProfilePhoto } = require("../../controllers/franchiseController");
const {authenticateAdmin, authorizeRole}= require("../../middleware/checkAuth")
router.post("/get-franchise-profile-photo",authenticateAdmin,
authorizeRole(["franchise"])
,getFranchiseProfilePhoto);

module.exports = router