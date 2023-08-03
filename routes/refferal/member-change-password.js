const express = require("express");
const router = express.Router();

const memberController = require("../../controllers/memberController");
const {
  authenticateMember,
  authorizeMember,
} = require("../../middleware/checkAuth");

router.post(
  "/member-change-password",
  authenticateMember,
  authorizeMember,
  memberController.memberChangePassword
);

module.exports = router;
