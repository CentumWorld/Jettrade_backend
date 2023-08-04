const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');
router.post('/search-refferal-payout-by-reffer-userid',authenticateAdmin,authorizeAdmin, adminController.searchRefferalPayoutByRefferUserid);


module.exports = router;