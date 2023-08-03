const express = require('express');
const router = express.Router();

const memberController = require('../../controllers/memberController');
const {
    authenticateMember,
    authorizeMember,
  } = require("../../middleware/checkAuth");
  
router.post('/refferal/member-fetch-refferal-payout',
authenticateMember,
authorizeMember,memberController.memberFetchRefferalPayout);

module.exports = router;