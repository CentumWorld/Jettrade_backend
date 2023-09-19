const express = require('express');
const router = express.Router();
const upload = require('../../utils/aws'); 
const {createVideoForPortfolio} = require('../../controllers/portfolioController');


router.post(
    '/create-video-for-portfolio',
    upload.fields([{ name: 'videoOne', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]),
    createVideoForPortfolio
  );


module.exports = router;
