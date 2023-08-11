const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');
router.get('/users/user-fetch-all-videos',authenticateAdmin,authorizeAdmin,adminController.getVideos);


module.exports = router;