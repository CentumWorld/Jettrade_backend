const express = require('express');
//const connection = require('../database/conn')
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const memberController = require('../../controllers/memberController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/fetch-member-details-member-side',checkMiddleware.checkAuth, memberController.fetchMemberDetailsMemberSide);


module.exports = router;