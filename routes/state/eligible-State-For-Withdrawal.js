const express = require('express');
const router = express.Router();

const { eligibleStateForWithdrawal } = require('../../controllers/stateController');
const {authenticateAdmin, authorizeRole} = require('../../middleware/checkAuth');

router.post('/eligible-for-withdrawal',authenticateAdmin,authorizeRole(["state"]), eligibleStateForWithdrawal);


module.exports = router;