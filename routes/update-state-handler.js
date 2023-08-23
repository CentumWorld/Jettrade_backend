
const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); 
const { authenticateAdmin, authorizeRole } = require('../middleware/checkAuth');
const { updateStateHandler } = require('../controllers/adminController');

router.put(
  '/update-state-handler',
  upload.fields([{ name: 'adharCard' }, { name: 'panCard'}]),
  authenticateAdmin,
  authorizeRole(["admin"]),
  updateStateHandler
);

module.exports = router;
