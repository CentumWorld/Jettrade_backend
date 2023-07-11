const express = require('express');
const router = express.Router();

const memberController = require('../../controllers/memberController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/refferal/refferal-total-withdrawal',checkMiddleware.checkAuth,memberController.refferalTotalWithdrawal);

module.exports = router;