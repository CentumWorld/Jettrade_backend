const express = require('express');
const router = express.Router();


const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/users/save-user-edited-details',checkMiddleware.checkAuth, userController.saveEditedUserDetails);


module.exports = router;