const express = require('express');
const router = express.Router();

const { filterFranchiseByState } = require('../../controllers/portfolioController');


router.post('/filter-franchise-by-state', filterFranchiseByState);


module.exports = router;