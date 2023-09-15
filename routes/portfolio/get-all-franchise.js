const express = require('express');
const router = express.Router();

const portfolioController = require('../../controllers/portfolioController');


router.get('/portfolio/get-all-franchise', portfolioController.getAllFranchises);


module.exports = router;