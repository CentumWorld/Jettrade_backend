const express = require('express');
const router = express.Router();


const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/users/fetch-Wallet-History',checkMiddleware.checkAuth, userController.fetchWalletHistory);


module.exports = router;