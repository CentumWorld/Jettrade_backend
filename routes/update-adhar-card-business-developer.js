
const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); 
const { authenticateAdmin, authorizeRole } = require('../middleware/checkAuth');
const {  updateAdharcardBusinessDeveloper } = require('../controllers/adminController');

router.put(
  '/update-adhar-card-business-developer',
  upload.fields([{ name: 'adharCard' }]),
  authenticateAdmin,
  authorizeRole(["admin", "state", "franchise","subAdmin"]),
  updateAdharcardBusinessDeveloper
);

module.exports = router;
