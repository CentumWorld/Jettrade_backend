const express = require('express');
const router = express.Router();


const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');

router.post('/filter-Transactions-With-Year-Month-Week',authenticateAdmin,authorizeAdmin, adminController.filterTransactionsWithYearMonthWeek);


module.exports = router;