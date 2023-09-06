const express = require('express');
const router = express.Router();
require('dotenv').config();

const {videoCreatorLogin} = require('../../controllers/videoCreatorController');


router.post('/login',videoCreatorLogin);


module.exports = router;