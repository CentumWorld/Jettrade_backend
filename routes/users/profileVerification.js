const express = require("express");
const router = express.Router();
const upload = require("../../utils/aws");
const {
  authenticateAdmin,
  authorizeRole,
} = require("../../middleware/checkAuth");
const { profileVerification } = require("../../controllers/userController");

router.post(
  "/profileVerification",
  upload.fields([{  name: 'aadhar_front_side' }, { name: 'aadhar_back_side' },{name:'pan_card'}]),

  profileVerification
);

module.exports = router;

