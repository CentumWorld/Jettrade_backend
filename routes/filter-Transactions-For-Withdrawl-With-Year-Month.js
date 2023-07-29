const express = require('express');
const router = express.Router();


const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');

router.post('/filter-Transactions-For-Withdrawl-With-Year-Month', checkMiddleware.checkAuth,adminController.filterTransactionsForWithdrawlWithYearMonth);


module.exports = router;