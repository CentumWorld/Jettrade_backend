const express = require("express");
const router = express.Router()
const { getFranchisesByReferralId } = require("../../controllers/stateController");
router.get('/getAll-frenchiseBy-referalId',getFranchisesByReferralId);
module.exports = router;
