const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');

router.post('/admin-interact-with-video',authenticateAdmin,authorizeAdmin,adminController.interactWithVideoForAdmin);


module.exports = router;