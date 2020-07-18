var express = require('express');
var router = express.Router();

const visitsService = require('../services/visitsService')

router.get('/',visitsService.getVisitList);
router.get('/now',visitsService.getNowVisitList);

module.exports = router;
