const express = require('express');
const router = express.Router();


const userController = require('../../controllers/userController');
const {authenticateUser,authorizeUser} = require('../../middleware/checkAuth');

router.get('/getallvideos',authenticateUser,authorizeUser, userController.getAllVideos);


module.exports = router;