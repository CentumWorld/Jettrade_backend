
const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); 
const { authenticateAdmin, authorizeRole } = require('../middleware/checkAuth');
const {  updateAdharCardBackSideFranchise } = require('../controllers/adminController');

router.put(
  '/update-adhar-card-back-side-franchise',
  upload.fields([{ name: 'adhar_back_side' }]),
  authenticateAdmin,
  authorizeRole(["admin", "state","subAdmin"]),
  updateAdharCardBackSideFranchise
);

module.exports = router;
