var User = require("./user.js");
var Stream = require("./stream.js");
var Tile = require("./tile.js");

function configure(API, database) {
  API.setHeader = function(response) {  
    response.setHeader("Access-Control-Allow-Origin", "http://localhost");
    response.setHeader("Access-Control-Allow-Headers", "http://localhost");
    response.setHeader("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE");
  };    
  
  API.printResponse = function(response, toSend) {
    API.setHeader(response);
    response.send(toSend);  
  }

  API.get('/', function (request, response) {  
    API.printResponse(
      response,
      'API running.'
    );
  });  
  
  API.get('/stream/home', function (request, response){
    return Stream.home(request, response, API.printResponse, database);
  });

  API.get('/stream/self', function (request, response){
    return Stream.selfStream(request, response, API.printResponse, database);
  });

  API.get('/stream/:username', function (request, response){
    return Stream.memberStream(request, response, API.printResponse, database);
  });

  API.get('/tile', function (request, response){
    return Tile.list(request, response, API.printResponse, database);
  });

  API.post('/tile', function (request, response) {
    return Tile.post(request, response, API.printResponse, database);
  });

  API.get('/tile/:id', function (request, response){
    return Tile.getTile(request, response, API.printResponse, database);
  });

  API.post('/user', function (request, response) {
    return User.post(request, response, API.printResponse, database);
  });

  API.post('/user/login', function (request, response){
    return User.login(request, response, API.printResponse, database);
  });

  API.post('/user/logout', function (request, response){
    return User.logout(request, response, API.printResponse);
  });

  API.get('/user/session', function (request, response){
    return User.getSession(request, response, API.printResponse);
  });
}

exports.configure = configure;