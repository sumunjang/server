var express = require('express');
var router = express.Router();

const visits = require('./visits');
const profile = require('./profile');
const auth = require('./auth');
const place = require('./place');
const questionnaires = require('./form');
const passport = require('passport');

router.use('/auth', auth);
router.use('/profile', passport.authenticate('jwt', {session: false}), profile);
router.use('/visits', passport.authenticate('jwt', {session: false}), visits);
router.use('/places', passport.authenticate('jwt', {session: false}), place);
router.use('/forms', passport.authenticate('jwt', {session: false}), questionnaires);

module.exports = router;
