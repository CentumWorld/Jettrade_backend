const express = require('express');
const router = express.Router();

const memberController = require('../../controllers/memberController');
const checkMiddleware= require('../../middleware/checkAuth')

router.post('/refferal/refferal-my-team',checkMiddleware.checkAuth,memberController.refferalMyTeam);

module.exports = router;