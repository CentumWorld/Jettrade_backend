const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');
router.post('/verify-buisness-developer-before-registration', adminController.verifyBuisnessDeveloperBeforeRegistration);


module.exports = router;