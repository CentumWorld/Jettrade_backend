const express = require('express');
const router = express.Router();


const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.get('/getallvideos',checkMiddleware.checkAuth, userController.getAllVideos);


module.exports = router;