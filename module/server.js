var express = require("express");
var bodyParser = require("body-parser");
var session = require('client-sessions');
var configuration = require('../configuration/global.js');

function start() {
	var API = express();

	API.use(function(req, res, next) {
		if (configuration.RUN_LOCAL) {
			res.setHeader('Access-Control-Allow-Origin', configuration.LOCAL_URL);
		} else {
			res.setHeader('Access-Control-Allow-Origin', configuration.DEVELOPMENT_URL);
		}
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		res.setHeader('Access-Control-Allow-Credentials', true);

		next();
	});

	var sessionConfiguration = {
    cookieName: 'session',
    secret: configuration.SESSION_SECRET,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  };
	API.use(session(sessionConfiguration));
	API.use(bodyParser.json());

	return API;
}

exports.start = start;
