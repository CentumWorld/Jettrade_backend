const express = require('express');
const router = express.Router();
require('dotenv').config();

const memberController = require('../../controllers/memberController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/refferal/member-fetch-refferal-payout',checkMiddleware.checkAuth,memberController.memberFetchRefferalPayout);

module.exports = router;