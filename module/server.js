var express = require("express");
var bodyParser = require("body-parser");
var session = require('client-sessions');

function start() {
  var API = express();

  API.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    // res.setHeader('Access-Control-Allow-Origin', 'http://development.mrrorinc-tiles.divshot.io');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
  });

  API.use(session({
    cookieName: 'session',
    secret: 'tiles_prototype',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  }));
  API.use(bodyParser.json());

  return API;
}

exports.start = start;