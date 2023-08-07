const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');

router.get('/find_Users_On_The_Basis_Of_Payment_Status',authenticateAdmin,authorizeAdmin,adminController.findUsersOnTheBasisOfPaymentStatus);


module.exports = router;