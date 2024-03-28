const express = require("express");
const router = express.Router();

const {  stateUpdateBankDetails } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/state/state-update-bank-details',authenticateAdmin,authorizeRole(["state"]),stateUpdateBankDetails);
module.exports = router;
