const express = require('express');
const router = express.Router();
require('dotenv').config();

const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/users/user-total-withdrawal',checkMiddleware.checkAuth,userController.userTotalWithdrawal);

module.exports = router;