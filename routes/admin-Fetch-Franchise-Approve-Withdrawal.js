const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/admin-fetch-franchise-approve-withdrawl',authenticateAdmin,authorizeRole(["admin"]), adminController.adminFetchFranchiseApproveWithdrawal);


module.exports = router;