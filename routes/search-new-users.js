const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin, authorizeRole} = require('../middleware/checkAuth');
router.post('/search-new-users',authenticateAdmin,authorizeRole(["admin", "subAdmin"]), adminController.searchNewUsers);


module.exports = router;