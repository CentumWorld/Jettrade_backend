
const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); 
const { authenticateAdmin, authorizeRole } = require('../middleware/checkAuth');
const {  updateAdharCardFrontSideFranchise } = require('../controllers/adminController');

router.put(
  '/update-adhar-card-front-side-franchise',
  upload.fields([{ name: 'adhar_front_side' }]),
  authenticateAdmin,
  authorizeRole(["admin", "state","subAdmin"]),
  updateAdharCardFrontSideFranchise
);

module.exports = router;
