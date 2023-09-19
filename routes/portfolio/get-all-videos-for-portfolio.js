const express = require('express');
const router = express.Router();

const portfolioController = require('../../controllers/portfolioController');


router.get('/get-all-videos-for-portfolio', portfolioController.getAllVideosForPortfolio);


module.exports = router;