const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); 
const adminController = require('../controllers/adminController');
const { authenticateAdmin, authorizeAdmin } = require('../middleware/checkAuth');

router.post(
  '/create_State_Handler',
  upload.fields([{ name: 'adharCard' }, { name: 'panCard'}]),
  authenticateAdmin,
  authorizeAdmin,
  adminController.createStateHandler
);

module.exports = router;
