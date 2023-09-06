const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); 
const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeVideoUpload, authorizeRole} = require('../middleware/checkAuth');


router.post(
    '/createvideo',
    upload.fields([{ name: 'videoOne', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]),
    authenticateAdmin,
    authorizeVideoUpload,
    adminController.createVideo
  );


module.exports = router;
