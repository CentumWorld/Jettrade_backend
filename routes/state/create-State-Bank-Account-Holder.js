const express = require("express");
const router = express.Router()
const {  createStateBankAccountHolder } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/create-state-bank-account-holder',authenticateAdmin,authorizeRole([ "state"]),createStateBankAccountHolder);
module.exports = router;
