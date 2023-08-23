
const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); 
const { authenticateAdmin, authorizeRole } = require('../middleware/checkAuth');
const {  updateBusinessDeveloper } = require('../controllers/adminController');

router.put(
  '/update-business-developer',
  upload.fields([{ name: 'adharCard' }, { name: 'panCard'}]),
  authenticateAdmin,
  authorizeRole(["admin", "state", 'franchise']),
  updateBusinessDeveloper
);

module.exports = router;
