'use strict';

var CV = require('../../../models/cv'),
    _ = require("underscore");

exports.init = function(req, res, next) {
	req.resourceName = 'cv';
	req.maxResult = 1;
	next();
}

exports.endFind = function(req, res, next) {
	var status = 200;		 
    if (req.result.length < req.count) {
    	status = 206;
    }
    return res.status(status).json(req.result);
}

exports.find = function(req, res, next) {
	req.count = 1;
	if (req.happyRest.range && req.happyRest.range.limit === req.maxResult && res > 0) {
		req.happyRest.range.limit = req.count;
	}

	var range = req.happyRest.range;
	var mongoReq = CV.find();			
	//add range
	mongoReq.skip(range.offset).limit(range.limit - range.offset);
	mongoReq.exec().then(function(res) {
		req.result = res;
		next();
	});	
  
};