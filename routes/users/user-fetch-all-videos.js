const express = require('express');
const router = express.Router();


const userController = require('../../controllers/userController');
const {authenticateUser,authorizeUser} = require('../../middleware/checkAuth');

router.get('/users/user-fetch-all-videos',authenticateUser, userController.userFetchAllVideo);


module.exports = router;