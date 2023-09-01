const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/admin-fetch-business-developer-approve-withdrawl',authenticateAdmin,authorizeRole(["admin"]), adminController.adminFetchBusinessDeveloperApproveWithdrawal);


module.exports = router;