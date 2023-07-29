const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth');

router.post('/fetch-all-new-paid-user', adminController.fetchAllNewPaidUser);


module.exports = router;