const express = require('express');
const router = express.Router();
require('dotenv').config();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.post('/fetch-city-by-referralid-in-franchise',authenticateAdmin,authorizeRole(["admin", "state"]), adminController.fetchCityByReferralIdInFranchise);


module.exports = router;