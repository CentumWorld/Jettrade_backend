const express = require('express');
const router = express.Router();
require('dotenv').config();

const memberController = require('../../controllers/memberController');

router.post('/member-verify-otp',memberController.memberVerifyOtp);

module.exports = router;