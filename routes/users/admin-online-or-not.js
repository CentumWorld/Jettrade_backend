const express = require('express');
const router = express.Router();

const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.get('/users/admin-online-or-not',checkMiddleware.checkAuth,userController.AdminOnlineOrNot);

module.exports = router;