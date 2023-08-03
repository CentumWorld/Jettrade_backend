const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');

router.post('/approve-member-refferal-payout',authenticateAdmin,authorizeAdmin,adminController.approveMemberRefferalPayout);


module.exports = router;