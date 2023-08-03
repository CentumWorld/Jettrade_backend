const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');
router.post('/total-withdrawal-money',checkMiddleware.checkAuth, adminController.totalWithdrawalMoney);


module.exports = router;