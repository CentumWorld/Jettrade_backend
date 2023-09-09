const express = require("express");
const router = express.Router();


const userController = require("../../controllers/userController");
const { authenticateUser, authorizeUser } = require("../../middleware/checkAuth");

router.post("/get-own-user-bank-and-upi-details",authenticateUser,authorizeUser,userController.getOwnUserBankAndUpiDetails
);

module.exports = router;
