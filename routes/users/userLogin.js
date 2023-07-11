const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userController = require('../../controllers/userController');

router.post('/login',userController.userLogin);

module.exports = router;