const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');

router.get('/counts-trader-referral-franchise-bmm',authenticateAdmin,authorizeRole(["admin"]), adminController.countsTraderReferralFranchiseBmm);


module.exports = router;