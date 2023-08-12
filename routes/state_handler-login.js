const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
router.post('/state-handler-login',adminController.stateHandlerLogin);


module.exports = router;