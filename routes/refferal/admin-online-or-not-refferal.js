const express = require("express");
const router = express.Router();

const memberController = require("../../controllers/memberController");
const {
  authenticateMember,
  authorizeMember,
} = require("../../middleware/checkAuth");

router.get(
  "/refferal/admin-online-or-not-refferal",
  authenticateMember,
  authorizeMember,
  memberController.adminOnlineOrNotRefferal
);

module.exports = router;
