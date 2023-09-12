const express = require('express');
const router = express.Router();

const { getAllStates } = require('../../controllers/portfolioController');


router.get('/get-all-states', getAllStates);


module.exports = router;