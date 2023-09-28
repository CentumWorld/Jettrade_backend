
const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); 
const { authenticateAdmin, authorizeRole } = require('../middleware/checkAuth');
const {  updateAdharcardFrontSideBusinessDeveloper } = require('../controllers/adminController');

router.put(
  '/update-adhar-card-front-side-business-developer',
  upload.fields([{ name: 'adhar_front_side' }]),
  authenticateAdmin,
  authorizeRole(["admin", "state", "franchise","subAdmin"]),
  updateAdharcardFrontSideBusinessDeveloper
);

module.exports = router;
