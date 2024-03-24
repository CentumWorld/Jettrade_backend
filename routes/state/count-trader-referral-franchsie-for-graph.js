const express = require('express');
const router = express.Router();

const stateController = require('../../controllers/stateController');
const {authenticateAdmin, authorizeRole} = require('../../middleware/checkAuth');

router.post('/count-trader-referral-franchsie-for-graph',authenticateAdmin, authorizeRole(["state"]), stateController.countTraderReferralFranchiseForGraph);


module.exports = router;