const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');
router.post('/get-member-bak-and-upi-details',authenticateAdmin,authorizeRole(["admin", "subAdmin"]), adminController.getMemberBankAndUpiDetails);


module.exports = router;