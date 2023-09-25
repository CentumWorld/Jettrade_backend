const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); 
const adminController = require('../controllers/adminController');
const { authenticateAdmin,  authorizeRole } = require('../middleware/checkAuth');

router.post(
  '/create-frenchise',
  upload.fields([{ name: 'adhar_front_side', maxCount: 1 },{ name: 'adhar_back_side', maxCount: 1 }, { name: 'panCard', maxCount: 1 }]),
  adminController.createFrenchise
);

module.exports = router;
