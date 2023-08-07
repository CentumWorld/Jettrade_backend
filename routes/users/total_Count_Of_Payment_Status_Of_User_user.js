// const express = require("express");
// const router = express.Router();

// const userController = require("../../controllers/userController");
// const {
//   authenticateUser,
//   authorizeUser,
// } = require("../../middleware/checkAuth");

// router.get(
//   "/total_Count_Of_Payment_Status_Of_User_user",
//   authenticateUser,
//   authorizeUser,
//   userController.totalCountOfPaymentStatusOfUseruser
  
// );

// module.exports = router;
const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  authenticateUser,
  authorizeUser,
} = require("../../middleware/checkAuth");

router.get(
  "/total_Count_Of_Payment_Status_Of_User_user",
  authenticateUser,
  authorizeUser,
  userController.totalCountOfPaymentStatusOfUseruser
);

module.exports = router;

