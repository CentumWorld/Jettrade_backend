const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); 
const adminController = require('../controllers/adminController');
const { authenticateAdmin, authorizeRole } = require('../middleware/checkAuth');

router.post(
  '/create_State_Handler',
  upload.fields([{ name: 'adharCard' }, { name: 'panCard'}]),
  authenticateAdmin,
  authorizeRole(["admin"]),
  adminController.createStateHandler
);

module.exports = router;
