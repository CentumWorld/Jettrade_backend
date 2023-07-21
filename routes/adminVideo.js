const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); // Update the path to awsS3.js file
const adminController = require('../controllers/adminController');
const checkMiddleware = require('../middleware/checkAuth')


// Create a new video
router.post('/createvideo', upload.single('videoOne'),checkMiddleware.checkAuth, adminController.createVideo);


module.exports = router;
