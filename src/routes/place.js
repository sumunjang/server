var express = require('express');
var router = express.Router();

const placeService = require('../services/placeService')

router.get('/search/:keyword', placeService.searchPlace);
router.get('/search/history', placeService.getHistory);
router.get('/:placeid', placeService.getPlaceInfo);

module.exports = router;
