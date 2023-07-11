const express = require('express');
const router = express.Router();


const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/fetch-profile-photo-user',checkMiddleware.checkAuth, userController.fetchProfilePhotoUser);


module.exports = router;