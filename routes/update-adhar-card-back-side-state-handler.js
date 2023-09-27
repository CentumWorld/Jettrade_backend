
const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); 
const { authenticateAdmin, authorizeRole } = require('../middleware/checkAuth');
const {  updateAdharCardBackSideStateHandler } = require('../controllers/adminController');

router.put(
  '/update-adhar-card-back-side-state-handler',
  upload.fields([{ name: 'adhar_back_side' }]),
  authenticateAdmin,
  authorizeRole(["admin", "state","subAdmin"]),
  updateAdharCardBackSideStateHandler
);

module.exports = router;
