const express = require('express');
const router = express.Router();

const memberController = require('../../controllers/memberController');

router.post('/member-forget-password',memberController.memberForgetPassword);

module.exports = router;