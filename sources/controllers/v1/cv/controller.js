'use strict';

var CV = require('../../../models/cv'),
    _ = require("underscore");

exports.init = function(req, res, next) {
	req.resourceName = 'cv';
	req.maxResult = 1;
	req.happyRest = {
		range : {
			offset : 0,
		    limit : 1
		}	    
	}	
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
	var mongoReq = CV.find();			
	//add range
	mongoReq.skip(0).limit(1);
	mongoReq.exec().then(function(res) {
		req.result = res;
		next();
	});	
  
};