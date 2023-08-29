const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/total-withdrawal-money',authenticateAdmin,authorizeRole(["admin", ]), adminController.totalWithdrawalMoney);


module.exports = router;