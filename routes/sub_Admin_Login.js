const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
router.post('/sub-admin-login',adminController.subAdminLogin);


module.exports = router;