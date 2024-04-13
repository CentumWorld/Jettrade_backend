const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin,  authorizeRole} = require('../middleware/checkAuth');

router.get('/fetch-all-withdrawal-request',authenticateAdmin,authorizeRole(["admin", "subAdmin"]),adminController.fetchAllWithdrawalRequest);


module.exports = router;