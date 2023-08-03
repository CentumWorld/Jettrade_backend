const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');

router.post('/approve-user-refferal-payout',authenticateAdmin,authorizeAdmin,adminController.approveUserRefferalPayout);


module.exports = router;