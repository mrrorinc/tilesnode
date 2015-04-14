var path = require("path");

var database = require("./module/database.js");
var server = require("./module/server.js");
var router = require("./module/router.js");

var API = server.start();
database.initialize();
router.configure(API, database);

// process.env.PORT may be passed in by the host
var port = process.env.PORT || 4444;
API.listen(port);

console.log('API available at port ' + port);
