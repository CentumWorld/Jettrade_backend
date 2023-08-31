const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/admin-fetch-state-handler-approve-withdrawal',authenticateAdmin,authorizeRole(["admin"]), adminController.adminFetchStateHandlerApproveWithdrawal);


module.exports = router;