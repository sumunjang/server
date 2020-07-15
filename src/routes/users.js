var express = require('express');
var router = express.Router();

const usersService = require('../services/usersService');

router.get('/', (req, res, next) => {
    res.json(usersService.getProfile());
});

router.post('/', usersService.signUp);

module.exports = router;
