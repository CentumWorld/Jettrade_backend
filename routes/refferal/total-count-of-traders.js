const express = require("express");
const router = express.Router();

const memberController = require("../../controllers/memberController");
const {
  authenticateMember,
  authorizeMember,
} = require("../../middleware/checkAuth");

router.post(
  "/refferal/total-count-of-traders",
//   authenticateMember,
//   authorizeMember,
  memberController.TotalCountOfTraders
);

module.exports = router;
