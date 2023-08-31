const express = require("express");
const router = express.Router()
const {  createStateUpiHolder } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/create-state-upi-holder',authenticateAdmin,authorizeRole([ "state"]),createStateUpiHolder);
module.exports = router;
