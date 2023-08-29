const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');
router.post('/search-refferal-payout-by-reffer-userid',authenticateAdmin,authorizeRole(["admin"]), adminController.searchRefferalPayoutByRefferUserid);


module.exports = router;