const express = require('express');
const router = express.Router();


const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/users/update-day-count',checkMiddleware.checkAuth, userController.updateDayCount);


module.exports = router;