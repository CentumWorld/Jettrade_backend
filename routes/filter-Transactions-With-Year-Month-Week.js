const express = require('express');
const router = express.Router();


const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/filter-Transactions-With-Year-Month-Week',authenticateAdmin,authorizeRole(["admin", "subAdmin"]), adminController.filterTransactionsWithYearMonthWeek);


module.exports = router;