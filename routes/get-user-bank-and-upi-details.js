const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');
router.post('/get-user-bank-and-upi-details',authenticateAdmin,authorizeRole(["admin"]), adminController.getUserBankAndUpiDetails);


module.exports = router;