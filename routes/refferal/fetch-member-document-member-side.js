const express = require('express');
const router = express.Router();


const memberController = require('../../controllers/memberController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/fetch-member-document-member-side',checkMiddleware.checkAuth, memberController.fetchMemberDocumentMemberSide);


module.exports = router;