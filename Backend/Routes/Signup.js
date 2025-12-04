const express = require('express');
const router = express.Router();

const {userSignUp} = require('../Controllers/SignupController');

router.post('/Signup', userSignUp);

module.exports = router;