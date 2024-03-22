const express = require('express');
const router = express.Router();

const stateController = require('../../controllers/stateController');
const {authenticateAdmin, authorizeRole} = require('../../middleware/checkAuth');

router.post('/state/count-trader-referral-franchise',authenticateAdmin,authorizeRole(["state",]), stateController.countTraderReferralFranchise);


module.exports = router;