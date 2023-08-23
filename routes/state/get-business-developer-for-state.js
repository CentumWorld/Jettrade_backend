const express = require("express");
const router = express.Router()
const { getBusinessDeveloperForState } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");


router.post('/get-business-developer-for-state',authenticateAdmin,authorizeRole(["admin", "state"]),getBusinessDeveloperForState);
module.exports = router;
