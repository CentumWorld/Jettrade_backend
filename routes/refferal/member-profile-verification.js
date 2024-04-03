
const express = require("express");
const router = express.Router();
const upload = require("../../utils/aws");
const {
  authenticateAdmin,
  authorizeRole,
} = require("../../middleware/checkAuth");
const { memberProfileVerification } = require("../../controllers/memberController");

router.post(
  "/member-profile-verification",
  upload.fields([{  name: 'aadhar_front_side' }, { name: 'aadhar_back_side' },{name:'pan_card'}]),
  authenticateAdmin,
  authorizeRole([ "member"]),
  memberProfileVerification
);

module.exports = router;


