const express = require('express');
const router = express.Router();


const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

router.post('/fetch-user-document-user',checkMiddleware.checkAuth, userController.fetchUserDocumentUser);


module.exports = router;