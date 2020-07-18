var express = require('express');
var router = express.Router();

const profileService = require('../services/profileService');

router.get('/', profileService.getProfile);
router.put('/', profileService.updateProfile);
router.delete('/', profileService.withdrawal);

router.get('/image', profileService.getProfileImage);
router.post('/image', profileService.uploadProfileImage);
router.put('/image', profileService.updateProfileImage);

module.exports = router;
