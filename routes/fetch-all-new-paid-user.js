const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');

router.post('/fetch-all-new-paid-user',authenticateAdmin,authorizeAdmin,adminController.fetchAllNewPaidUser);


module.exports = router;