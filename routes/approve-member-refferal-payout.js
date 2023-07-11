const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');

router.post('/approve-member-refferal-payout',checkMiddleware.checkAuth, adminController.approveMemberRefferalPayout);


module.exports = router;