const express = require("express");
const router = express.Router();

const {  getStateOwnBankDetails } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/get-state-own-bank-details',authenticateAdmin,authorizeRole(["state"]),getStateOwnBankDetails);
module.exports = router;
