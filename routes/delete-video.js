const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeAdmin} = require('../middleware/checkAuth');
router.delete('/delete-video/:id', authenticateAdmin, authorizeAdmin, adminController.deleteVideo);
module.exports = router;