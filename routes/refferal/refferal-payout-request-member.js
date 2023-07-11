const express = require('express');
const router = express.Router();
require('dotenv').config();

const memberController = require('../../controllers/memberController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/refferal/refferal-payout-request-member',checkMiddleware.checkAuth,memberController.refferalPayoutRequestMember);

module.exports = router;