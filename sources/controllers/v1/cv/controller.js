'use strict';

var CV = require('../../../models/cv'),
    requestName = 'cv',
    maxResultPossible = 1,
    _ = require("underscore"),
    RSVP = require('rsvp'),
    requestProcess = require('reqrestextract');

function count(infos) {
	return new RSVP.Promise(function(resolve, reject) {
		return CV.count().exec().then(function(res) {
			infos.count = res;
			if (infos.range.limit === maxResultPossible && res > 0) {
				infos.range.limit = res;
			}
			resolve(infos);
		});
	});
}

function find(infos) {
	return new RSVP.Promise(function(resolve, reject) {
			var req = CV.find({});
			req = requestProcess.addRange(req, infos.range);										
			return req.exec().then(function(res) {
				infos.result = res;
				resolve(infos);
			});
	});
}

exports.find = function(req, res) {

	function setAcceptRange() {
		res.setHeader('Accept-Range', requestName + ' ' + maxResultPossible);
	}
	
	function reject(error) {
		setAcceptRange();
		return res.status(error.status).send({reason : error.reason});
	}

	function end(infos) {
		res.setHeader('Content-Range', infos.range.offset + '-' + infos.range.limit + '/'+ infos.count );
		setAcceptRange();
		var status = 200;
		if (infos.result.length < infos.count) {
			status = 206;
		}
		return res.status(status).json(infos.result);		
	}

	req.maxResultPossible = maxResultPossible;
	requestProcess.prepare(req, reject)
	.then(requestProcess.range, reject)
	.then(requestProcess.fields, reject)
	.then(count, reject)
	.then(find, reject)
	.then(requestProcess.format, reject)
	.then(end);
  
};