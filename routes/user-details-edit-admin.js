const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');
router.post('/user-details-edit-admin',checkMiddleware.checkAuth, adminController.userDetailsEditAdmin);


module.exports = router;