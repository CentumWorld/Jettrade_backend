const express = require('express');
const router = express.Router();
require('dotenv').config();

const userController = require('../../controllers/userController');
const {authenticateUser,authorizeUser} = require('../../middleware/checkAuth');

router.post('/users/user-fetch-refferal-payout',authenticateUser,authorizeUser,userController.userfetchRefferalPayout);

module.exports = router;