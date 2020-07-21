var express = require('express');
var router = express.Router();

const formService = require('../services/formService')

router.get('/',formService.getMySubmits);
router.get('/:placeid',formService.getFormInPlace);
router.get('/:placeid/:submitid',formService.getMySubmit);
router.post('/:placeid',formService.submitForm);
router.put('/:placeid',formService.updateForm);

module.exports = router;
