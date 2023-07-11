const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); // Update the path to awsS3.js file
const { createVideo } = require('../controllers/videoController');


// Create a new video
router.post('/createvideo', upload.single('videoOne'), createVideo);

module.exports = router;
