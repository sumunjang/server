var express = require('express');
var router = express.Router();

const main = require('./main');
const user = require('./users');
const auth = require('./auth');
const passport = require('passport');

router.use('/main',passport.authenticate('jwt',{session: false}),  main);
router.use('/user', user);
router.use('/auth',auth);

module.exports = router;
