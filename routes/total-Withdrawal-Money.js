const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');

router.post('/total-withdrawal-money',authenticateAdmin,authorizeAdmin, adminController.totalWithdrawalMoney);


module.exports = router;