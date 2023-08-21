const express = require("express");
const router = express.Router()
const { getFranchisesByReferralId } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.post('/fetch-all-franchise-in-state',authenticateAdmin,authorizeRole(["admin", "state"]),getFranchisesByReferralId);
module.exports = router;
