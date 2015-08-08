'use strict';

var express = require('express');
var controller = require('./controller');
var router = express.Router();
var happyRestFields = require('happyrestfields');
var happyRestRange = require('happyrestrange');

router.get('/', controller.init, happyRestRange.extractRange, controller.find, happyRestFields.selectionFields, happyRestRange.setHeader, controller.endFind);

module.exports = router;