const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin,authorizeRole} = require('../middleware/checkAuth');
router.post('/admin-fetch-user-one-video-like',authenticateAdmin,authorizeRole(["admin","subAdmin", "state", "franchise", "businessDeveloper"]), adminController.AdminfetchUserOneVideoLike);


module.exports = router;