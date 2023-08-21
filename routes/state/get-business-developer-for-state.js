const express = require("express");
const router = express.Router()
const { getBusinessDeveloperForState } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");


router.get('/get-business-developer-for-state/:id',authenticateAdmin,authorizeRole(["admin", "state"]),getBusinessDeveloperForState);
module.exports = router;
