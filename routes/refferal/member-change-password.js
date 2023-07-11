const express = require('express');
const router = express.Router();
require('dotenv').config();

const memberController = require('../../controllers/memberController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/member-change-password',checkMiddleware.checkAuth,memberController.memberChangePassword);

module.exports = router;