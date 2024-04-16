const express = require("express");
const router = express.Router();
const { fetchFranchiseNote } = require("../../controllers/franchiseController");
const {authenticateAdmin, authorizeRole}= require("../../middleware/checkAuth")
router.get("/fetch-franchise-note",authenticateAdmin,
authorizeRole(["franchise"])
,fetchFranchiseNote);

module.exports = router