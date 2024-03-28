const express = require('express');
const router = express.Router();

require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin,  authorizeRole} = require('../middleware/checkAuth');

router.get('/fetch-total-trading-value',authenticateAdmin,authorizeRole(["admin","subAdmin", "state", "franchise", "member", "user"]), adminController.fetchtotalTradingValue);


module.exports = router;