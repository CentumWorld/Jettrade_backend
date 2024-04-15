const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin,  authorizeRole} = require('../middleware/checkAuth');
router.put('/update-user-trading-wallet',authenticateAdmin,authorizeRole(["admin"]), adminController.updateUserTradingWallet);


module.exports = router;