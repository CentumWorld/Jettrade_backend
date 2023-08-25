
const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); 
const { authenticateAdmin, authorizeRole } = require('../middleware/checkAuth');
const {  updatePanCardBusinessDeveloper } = require('../controllers/adminController');

router.put(
  '/update-pan-card-business-developer',
  upload.fields([{ name: 'adharCard' }]),
  authenticateAdmin,
  authorizeRole(["admin", "state", "franchise"]),
  updatePanCardBusinessDeveloper
);

module.exports = router;
