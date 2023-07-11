const express = require('express');
const router = express.Router();
//require('dotenv').config();

const memberController = require('../../controllers/memberController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/refferal/save-member-edited-details',checkMiddleware.checkAuth, memberController.saveMemberEditedDetails);


module.exports = router;