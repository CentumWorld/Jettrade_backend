const express = require('express');
const router = express.Router();
require('dotenv').config();

const userController = require('../../controllers/userController');
const {authenticateUser,authorizeUser} = require('../../middleware/checkAuth');

router.post('/users/user-my-team',authenticateUser,authorizeUser,userController.userMyTeam);

module.exports = router;