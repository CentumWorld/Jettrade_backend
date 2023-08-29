const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/approve-user-refferal-payout',authenticateAdmin,authorizeRole(["admin"]),adminController.approveUserRefferalPayout);


module.exports = router;