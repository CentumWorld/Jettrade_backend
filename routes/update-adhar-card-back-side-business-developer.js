
const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); 
const { authenticateAdmin, authorizeRole } = require('../middleware/checkAuth');
const {  updateAdharcardBackSideBusinessDeveloper } = require('../controllers/adminController');

router.put(
  '/update-adhar-card-back-side-business-developer',
  upload.fields([{ name: 'adhar_back_side' }]),
  authenticateAdmin,
  authorizeRole(["admin", "state", "franchise","subAdmin"]),
  updateAdharcardBackSideBusinessDeveloper
);

module.exports = router;
