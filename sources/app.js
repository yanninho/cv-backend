/**
 * Main application
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express')
var app  = express();
var config = require('./config/environment');

require('./db')(config);
require('./server')(app,config);
require('./routes')(app);

module.exports = app;