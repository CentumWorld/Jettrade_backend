const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin,  authorizeRole} = require('../middleware/checkAuth');
router.put('/admin-adding-trading-amount-for-trader',authenticateAdmin,authorizeRole(["admin"]), adminController.adminAddingTradingAmountForTrader);


module.exports = router;