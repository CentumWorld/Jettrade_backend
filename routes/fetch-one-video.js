const express = require('express');
const router = express.Router();

require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/fetch-one-video',authenticateAdmin,authorizeRole(["admin", "state", "franchise", "businessDeveloper"]), adminController.fetchOneVideo);


module.exports = router;