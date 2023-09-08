const express = require("express");
const router = express.Router();

const memberController = require("../../controllers/memberController");
const {
  authenticateMember,
  authorizeMember,
} = require("../../middleware/checkAuth");

router.post(
  "/get-member-own-upi",
  authenticateMember,
  authorizeMember,
  memberController.getMemberOwnUpi
);

module.exports = router;
