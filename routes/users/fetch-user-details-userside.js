const express = require('express');
//const connection = require('../database/conn')
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/fetch-user-details-userside',checkMiddleware.checkAuth, userController.fetchUserDetailsUserside);


module.exports = router;