const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');

router.post('/create_subadmin',authenticateAdmin,authorizeAdmin,adminController.createSubAdmin);


module.exports = router;