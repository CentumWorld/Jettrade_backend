const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');
router.post('/search-renewal-users',authenticateAdmin,authorizeRole(["admin","subAdmin"]), adminController.searchRenewalUsers);


module.exports = router;