const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); 
const adminController = require('../controllers/adminController');
const { authenticateAdmin, authorizeRole } = require('../middleware/checkAuth');

router.post(
  '/create-business-developer',
  upload.fields([{ name: 'adharCard', maxCount: 1 }, { name: 'panCard', maxCount: 1 }]),
  adminController.createBusinnesDeveloper
);

module.exports = router;
