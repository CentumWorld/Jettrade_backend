const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');

router.post('/fetch-particular-user-details-from-admin-using-userid',adminController.fetchParticularUserDetailsFromAdminUsingUserid);


module.exports = router;