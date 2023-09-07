const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/block-subAdmin-by-Admin',authenticateAdmin,authorizeRole(["admin"]),adminController.blockSubAdminByAdmin);


module.exports = router;