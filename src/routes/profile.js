var express = require('express');
var router = express.Router();

const profileService = require('../services/profileService');

router.get('/', profileService.getProfile);
router.put('/', profileService.updateProfile);
router.delete('/', profileService.withdrawal);

module.exports = router;
