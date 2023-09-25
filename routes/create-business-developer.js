const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); 
const adminController = require('../controllers/adminController');

router.post(
  '/create-business-developer',
  upload.fields([{ name: 'adhar_back_side', maxCount: 1 } ,{name: 'adhar_front_side'},{ name: 'panCard', maxCount: 1 }]),
  adminController.createBusinnesDeveloper
);

module.exports = router;
