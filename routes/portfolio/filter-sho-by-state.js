const express = require('express');
const router = express.Router();

const {filterSHOByState } = require('../../controllers/portfolioController');


router.post('/filter-sho-by-state', filterSHOByState);


module.exports = router;