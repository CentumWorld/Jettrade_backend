const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.get('/find_Users_On_The_Basis_Of_Payment_Status',authenticateAdmin,authorizeRole(["admin"]),adminController.findUsersOnTheBasisOfPaymentStatus);


module.exports = router;