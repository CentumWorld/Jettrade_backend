const express = require('express');
const router = express.Router();

const memberController = require('../../controllers/memberController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/refferal/set-notification-to-false-member',checkMiddleware.checkAuth, memberController.setNotificationToFalseMember);


module.exports = router;