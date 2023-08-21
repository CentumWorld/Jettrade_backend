const express = require("express");
const router = express.Router()
const { getFranchisesByReferralId } = require("../../controllers/stateController");
const { authenticateAdmin, authorizeRole } = require("../../middleware/checkAuth");
router.get('/getAll-frenchiseBy-referalId',authenticateAdmin,authorizeRole(["admin", "state"]),getFranchisesByReferralId);
module.exports = router;
