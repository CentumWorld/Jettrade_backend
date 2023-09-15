const express = require('express');
const router = express.Router();


const userController = require('../../controllers/userController');
const {authenticateUser,
    authorizeUser,} = require('../../middleware/checkAuth');

router.post('/users/verify-refferalId-in-user',userController.verifyRefferalIdInUser);


module.exports = router;