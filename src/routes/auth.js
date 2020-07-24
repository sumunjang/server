var express = require('express');
var router = express.Router();

const authService = require('../services/authService')

router.post('/signin', authService.signIn);
router.post('/signup', authService.signUp);
router.get('/idcheck/:id',authService.idcheck)

module.exports = router;