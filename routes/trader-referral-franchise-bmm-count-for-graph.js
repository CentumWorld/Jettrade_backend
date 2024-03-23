
const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); 
const { authenticateAdmin, authorizeRole } = require('../middleware/checkAuth');
const {  traderReferralFranchiseBmmCountForGraph } = require('../controllers/adminController');

router.get(
  '/trader-referral-franchise-bmm-count-for-graph',
  authenticateAdmin,
  authorizeRole(["admin","subAdmin"]),
  traderReferralFranchiseBmmCountForGraph
);

module.exports = router;
