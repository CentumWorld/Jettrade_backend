const express = require('express');
const router = express.Router();


const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/users/update-expire',checkMiddleware.checkAuth, userController.updateExpireUser);


module.exports = router;