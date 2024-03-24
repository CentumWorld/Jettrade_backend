const express = require('express');
const router = express.Router();

const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');
const { totalTradingValue } = require('../controllers/adminController');

router.post('/total-trading-value',authenticateAdmin,authorizeRole(["admin", ]), totalTradingValue);


module.exports = router;