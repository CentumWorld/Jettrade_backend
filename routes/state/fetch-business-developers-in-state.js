const express = require("express");
const router = express.Router()
const {  getBusinessDevelopersInState } = require("../../controllers/stateController");
const { authenticateState, authorizeState } = require("../../middleware/checkAuth");
router.get('/fetch-all-business-developers-in-state',authenticateState,authorizeState,getBusinessDevelopersInState);
module.exports = router;
