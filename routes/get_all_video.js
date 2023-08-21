const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin,authorizeRole} = require('../middleware/checkAuth');

router.get('/fetch-all-videos',authenticateAdmin, authorizeRole(['admin', 'subAdmin', 'state']),adminController.getVideos);


module.exports = router;