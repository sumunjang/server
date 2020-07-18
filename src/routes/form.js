var express = require('express');
var router = express.Router();

const formService = require('../services/formService')

router.get('/',formService.getMySubmits);
router.get('/:placeid',formService.getMySubmitsInPlace);
router.get('/:placeid/:submitd',formService.getMySubmit);
router.post('/:placeid',formService.submitQuestionnaire);

module.exports = router;
