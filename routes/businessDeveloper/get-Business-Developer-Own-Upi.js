const express = require("express");
const router = express.Router()
const { getBusinessDeveloperOwnUpi } = require("../../controllers/businessDevController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/get-business-developer-own-upi',authenticateAdmin,authorizeRole([ "businessDeveloper"]),getBusinessDeveloperOwnUpi);
module.exports = router;
