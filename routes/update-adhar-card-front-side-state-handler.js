
const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); 
const { authenticateAdmin, authorizeRole } = require('../middleware/checkAuth');
const {  updateAdharCardFrontSideStateHandler } = require('../controllers/adminController');

router.put(
  '/update-adhar-card-front-side-state-handler',
  upload.fields([{ name: 'adhar_front_side' }]),
  authenticateAdmin,
  authorizeRole(["admin", "state","subAdmin"]),
  updateAdharCardFrontSideStateHandler
);

module.exports = router;
