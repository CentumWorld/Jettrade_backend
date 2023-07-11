const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const memberController = require('../../controllers/memberController');

router.post('/member-login',memberController.memberLogin);

module.exports = router;