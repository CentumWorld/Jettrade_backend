const express = require('express');
const router = express.Router();
require('dotenv').config();

const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/users/user-update-wallet-after-adding',checkMiddleware.checkAuth,userController.userUpdateWalletAfterAdding);

module.exports = router;