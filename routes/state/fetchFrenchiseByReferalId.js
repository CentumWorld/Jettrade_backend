const express = require("express");
const router = express.Router()
const { getFranchisesByReferralId } = require("../../controllers/stateController");
const { authenticateState, authorizeState } = require("../../middleware/checkAuth");
router.get('/getAll-frenchiseBy-referalId',authenticateState,authorizeState,getFranchisesByReferralId);
module.exports = router;
