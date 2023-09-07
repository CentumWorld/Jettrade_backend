
const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); 
const { authenticateAdmin, authorizeRole } = require('../middleware/checkAuth');
const {updatePanCardStateHandler   } = require('../controllers/adminController');

router.put(
  '/update-pan-card-state-handler',
  upload.fields([{ name: 'panCard'}]),
  authenticateAdmin,
  authorizeRole(["admin", "state","subAdmin"]),
  updatePanCardStateHandler
);

module.exports = router;
