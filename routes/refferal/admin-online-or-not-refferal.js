const express = require('express');
const router = express.Router();

const memberController = require('../../controllers/memberController');
const checkMiddleware = require('../../middleware/checkAuth');

router.get('/refferal/admin-online-or-not-refferal',checkMiddleware.checkAuth, memberController.adminOnlineOrNotRefferal);


module.exports = router;