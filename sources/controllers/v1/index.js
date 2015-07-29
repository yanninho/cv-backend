'use strict';

var express = require('express');
var router = express.Router();

router.use('/cv', require('./cv'));

module.exports = router;