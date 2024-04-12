const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.put('/approve-withdrawal-request',authenticateAdmin,authorizeRole(["admin", "subAdmin"]),adminController.approveWithdrawalRequest);


module.exports = router;