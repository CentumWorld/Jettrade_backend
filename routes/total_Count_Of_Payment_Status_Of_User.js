const express = require('express');
const router = express.Router();





const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');

router.get('/total_Count_Of_Payment_Status_Of_User',authenticateAdmin,authorizeAdmin, adminController.totalCountOfPaymentStatusOfUser);


module.exports = router;