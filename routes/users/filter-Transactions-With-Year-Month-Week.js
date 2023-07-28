const express = require('express');
const router = express.Router();


const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.get('/users/filter-Transactions-With-Year-Month-Week', userController.filterTransactionsWithYearMonthWeek);


module.exports = router;