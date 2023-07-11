const express = require('express');
const router = express.Router();


const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/users/edit-user-details',checkMiddleware.checkAuth, userController.editUserDetails);


module.exports = router;