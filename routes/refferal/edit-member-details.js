const express = require('express');
const router = express.Router();
//require('dotenv').config();

const memberController = require('../../controllers/memberController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/refferal/edit-member-details',checkMiddleware.checkAuth, memberController.editMemberDetails);


module.exports = router;