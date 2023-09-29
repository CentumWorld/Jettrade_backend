const express = require("express");
const router = express.Router();
const { fetchFranchiseNotification } = require("../../controllers/franchiseController");
const {authenticateAdmin, authorizeRole}= require("../../middleware/checkAuth")
router.post("/frenchise/fetch-franchise-notification",authenticateAdmin,
authorizeRole(["franchise"])
,fetchFranchiseNotification);

module.exports = router