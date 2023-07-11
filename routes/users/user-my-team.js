const express = require('express');
const router = express.Router();
require('dotenv').config();

const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/users/user-my-team',checkMiddleware.checkAuth,userController.userMyTeam);

module.exports = router;