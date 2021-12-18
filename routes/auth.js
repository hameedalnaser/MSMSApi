const express = require('express');

const router = express.Router();

//import controllers
const {
    signup,
    signin,
} = require('../controllers/auth');

//import validators from validator folder.
const {userSignupValidator, userSigninValidator, requireSignin} = require('../validators/auth');
const {runValidation} = require('../validators/index')

router.post('/signup', userSignupValidator,runValidation,signup);

router.post('/signin', userSigninValidator,runValidation,signin);

module.exports = router;