
const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); 
const { authenticateAdmin, authorizeRole } = require('../middleware/checkAuth');
const {  updateAdharCardStateHandler } = require('../controllers/adminController');

router.put(
  '/update-adhar-card-state-handler',
  upload.fields([{ name: 'adharCard' }]),
  authenticateAdmin,
  authorizeRole(["admin", "state"]),
  updateAdharCardStateHandler
);

module.exports = router;
