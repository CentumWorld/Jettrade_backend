const express = require("express");
const router = express.Router();


const userController = require("../../controllers/userController");
const { authenticateUser, authorizeUser } = require("../../middleware/checkAuth");

router.post("/get-own-trader-credit-wallet-transaction-details",authenticateUser,authorizeUser,userController.getOwnTraderCreditWalletTransactionDetails);

module.exports = router;
