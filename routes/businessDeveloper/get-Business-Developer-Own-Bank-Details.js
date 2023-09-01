const express = require("express");
const router = express.Router()
const { getBusinessDeveloperOwnBankDetails } = require("../../controllers/businessDevController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/get-business-developer-own-bank-details',authenticateAdmin,authorizeRole([ "businessDeveloper"]),getBusinessDeveloperOwnBankDetails);
module.exports = router;
