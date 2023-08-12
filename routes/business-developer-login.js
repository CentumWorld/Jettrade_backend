const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
router.post('/business-developer-login',adminController.businessDeveloperLogin);


module.exports = router;