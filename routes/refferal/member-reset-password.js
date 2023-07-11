const express = require('express');
const router = express.Router();
require('dotenv').config();

const memberController = require('../../controllers/memberController');

router.post('/member-reset-password',memberController.memberResetPassword);

module.exports = router;