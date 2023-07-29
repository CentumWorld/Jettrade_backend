const express = require('express');
const router = express.Router();


const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');

router.post('/filter-Transactions-With-Year-Month-Week',checkMiddleware.checkAuth, adminController.filterTransactionsWithYearMonthWeek);


module.exports = router;