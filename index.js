var path = require("path");

var database = require("./module/database.js");
var server = require("./module/server.js");
var router = require("./module/router.js");

var API = server.start();
database.initialize();
router.configure(API, database);

API.listen(process.env.PORT || 4444);
