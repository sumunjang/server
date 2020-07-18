var express = require('express');
var router = express.Router();

const questionnairesService = require('../services/questionnairesService')

router.get('/',questionnairesService.getMySubmits);
router.get('/:placeid',questionnairesService.getMySubmitsInPlace);
router.get('/:placeid/:submitd',questionnairesService.getMySubmit);
router.post('/:placeid',questionnairesService.submitQuestionnaire);

module.exports = router;
