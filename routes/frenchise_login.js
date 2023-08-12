const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
router.post('/frenchise-login',adminController.frenchiseLogin);


module.exports = router;