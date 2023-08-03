const express = require("express");
const router = express.Router();

const memberController = require("../../controllers/memberController");
const {
  authenticateMember,
  authorizeMember,
} = require("../../middleware/checkAuth");

router.post(
  "/refferal/refferal-total-withdrawal",
  authenticateMember,
  authorizeMember,
  memberController.refferalTotalWithdrawal
);

module.exports = router;
