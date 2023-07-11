const express = require('express');
const router = express.Router();


const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/users/fetch-approve-refferal-payout-user',checkMiddleware.checkAuth, userController.fetchApproveRefferalPayoutUser);


module.exports = router;