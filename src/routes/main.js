var express = require('express');
var router = express.Router();

const mainService = require('../services/mainService')

router.get('/',(req, res, next) =>{
  res.json(mainService.mainMessage());
});

module.exports = router;
