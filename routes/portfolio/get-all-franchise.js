const express = require('express');
const router = express.Router();

const { getAllFranchises } = require('../../controllers/portfolioController');


router.get('/get-all-franchises', getAllFranchises);


module.exports = router;