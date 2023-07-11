const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');

router.get('/fetch-member-details',checkMiddleware.checkAuth, adminController.fetchMemberDetails);


module.exports = router;