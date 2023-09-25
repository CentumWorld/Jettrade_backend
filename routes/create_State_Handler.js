const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); 
const adminController = require('../controllers/adminController');
const { authenticateAdmin, authorizeRole } = require('../middleware/checkAuth');

router.post(
  '/create_State_Handler',
  upload.fields([{ name: 'adhar_front_side', maxCount: 1 },{ name: 'adhar_back_side', maxCount: 1 }, { name: 'panCard'}]),

  adminController.createStateHandler
);

module.exports = router;
