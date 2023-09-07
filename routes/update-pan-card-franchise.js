
const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); 
const { authenticateAdmin, authorizeRole } = require('../middleware/checkAuth');
const {  updatePanCardFranchise } = require('../controllers/adminController');

router.put(
  '/update-pan-card-franchise',
  upload.fields([{ name: 'panCard'}]),
  authenticateAdmin,
  authorizeRole(["admin", "state","subAdmin"]),
  updatePanCardFranchise
);

module.exports = router;
