const express = require("express");
const router = express.Router();
const { setNotificationToFalseFranchise } = require("../../controllers/franchiseController");
const {authenticateAdmin, authorizeRole}= require("../../middleware/checkAuth")
router.post("/frenchise/set-notification-to-false-franchise",authenticateAdmin,
authorizeRole(["franchise"])
,setNotificationToFalseFranchise);

module.exports = router