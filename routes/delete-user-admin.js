const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');

router.post('/delete-user-admin',checkMiddleware.checkAuth, adminController.deleteUserAdmin);


module.exports = router;