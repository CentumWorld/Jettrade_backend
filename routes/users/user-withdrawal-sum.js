const express = require('express');
const router = express.Router();
require('dotenv').config();

const userController = require('../../controllers/userController');
const {authenticateUser,authorizeUser} = require('../../middleware/checkAuth');

router.post('/sum-of-user-withdrawal',authenticateUser,authorizeUser,userController.sumOfUserWithdrawal);

module.exports = router;