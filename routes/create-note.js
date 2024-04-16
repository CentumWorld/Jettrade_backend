const express = require('express');
const router = express.Router();
const upload = require('../utils/aws'); 
const adminController = require('../controllers/adminController');
const { authenticateAdmin,  authorizeRole } = require('../middleware/checkAuth');

router.post(
  '/create-note',
  upload.fields([{ name: 'audio', maxCount: 1 }]),
  authenticateAdmin,
  authorizeRole(["admin", "subAdmin"]),
  adminController.createNote
);

module.exports = router;
