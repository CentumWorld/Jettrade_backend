const express = require("express");
const router = express.Router()
const {  getBusinessDevelopersInState } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.get('/fetch-all-business-developers-in-state',authenticateAdmin,authorizeRole(["admin", "state"]),getBusinessDevelopersInState);
module.exports = router;
