const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');
router.post('/search-new-users',authenticateAdmin,authorizeAdmin, adminController.searchNewUsers);


module.exports = router;