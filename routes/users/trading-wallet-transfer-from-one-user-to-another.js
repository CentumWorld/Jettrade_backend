const express = require('express');
const router = express.Router();


const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/trading-wallet-transfer-from-one-user-to-another',checkMiddleware.checkAuth, userController.tradingWalletTransferFromOneUserToAnother);


module.exports = router;