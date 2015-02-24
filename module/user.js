var bcrypt = require('bcrypt-nodejs');

function post(request, response, callback, database) {
  var responseData = {
    success: false
  };
  if (request.body.email && (request.body.email != ""))
  {
    if (request.body.username && (request.body.username.length > 5))
    {
      if (request.body.password && (request.body.password.length > 5))
      {
        if (request.body.password == request.body.passwordConfirmed)
        {
          responseData.success = true;
        } else {
          responseData.error = "passwords don't match";
        }
      } else {
        responseData.error = "password too short!";
      }
    } else {
      responseData.error = "username too short!";
    }
  } else {
    responseData.error = "please provide an email address!";
  }
  
  if (responseData.success)
  {
    var newUser = new database.UserModel(request.body);
    newUser.realm = 'member';
    newUser.password = bcrypt.hashSync(newUser.password);
    newUser.save(function(error) {
      if (error)
      {
        responseData.success = false;
        responseData.error = "email address or username is already in use.";
        callback.call(null, response, responseData);
      } else {
        var newStream = new database.StreamModel({
          publisherName : newUser.username,
          streamName : newUser.username
        });
        newStream.save(function(error) {
          database.StreamModel.findOne({
            publisherName: newUser.username
          })
          .exec(function(error, stream) {
            request.session.user = {
              realm: newUser.realm,
              username: newUser.username,
              streamID: stream._id,
              _id: newUser._id
            };
            responseData.user = request.session.user;
            callback.call(null, response, responseData);
          });
        });
      }
    });
  } else {
    callback.call(null, response, responseData);
  }
}

function login(request, response, callback, database) {
  var responseData = {
    success: false
  };
  var query = {
    username: request.body.username
  };
  return database.UserModel.findOne(query, function (error, user) {
    if (!error && user) {
      if (bcrypt.compareSync(request.body.password, user.password))
      {
        database.StreamModel.findOne({
          publisherName: user.username
        })
        .exec(function(error, stream) {
          request.session.user = {
            realm: user.realm,
            username: user.username,
            streamID: stream._id,
            _id: user._id
          };
          responseData.user = request.session.user;
          if (user.realm == 'member')
          {
            responseData.redirect = 'home';
          }
          if (user.realm == 'admin')
          {
            responseData.redirect = 'admin';
          }
          responseData.success = true;
          
          callback.call(null, response, responseData);
        });
      }
    }
  });
}

function logout(request, response, callback) {
  request.session.reset();
  var responseData = {
    success: true
  };
  callback.call(null, response, responseData);
}

function getSession(request, response, callback) {
  var user = null;
  if (request.session)
  {
    if (request.session.user)
    {
      user = request.session.user;
    }
  }
  callback.call(null, response, user);
}

exports.post = post;
exports.login = login;
exports.logout = logout;
exports.getSession = getSession;