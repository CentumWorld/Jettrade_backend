const express = require('express');
const router = express.Router();


const memberController = require('../../controllers/memberController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/fetch-member-profile-photo',checkMiddleware.checkAuth, memberController.fetchMemberProfilePhoto);


module.exports = router;