const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.get('/fetch-member-credit-wallet-transaction-details',authenticateAdmin,authorizeRole(["admin","subAdmin"]),adminController.fetchMemberCreditwalletTransactionDetails);


module.exports = router;