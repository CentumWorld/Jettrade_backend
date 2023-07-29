const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');

router.post('/admin-fetch-all-renewal-user',checkMiddleware.checkAuth,adminController.adminFetchAllRenewalUser);


module.exports = router;