const express = require("express");
const router = express.Router();


const userController = require("../../controllers/userController");
const { authenticateUser, authorizeUser } = require("../../middleware/checkAuth");

router.post("/users/interact_with_video",authenticateUser,authorizeUser,userController.interactWithVideo);

module.exports = router;
