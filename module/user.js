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
    newUser.save(function(error) {
      responseData.user = newUser;
      request.session.user = newUser;
      callback.call(null, response, responseData);
    });
  } else {
    callback.call(null, response, responseData);
  }
}

function login(request, response, callback, database) {
  var responseData = {
    success: false
  };
  return database.UserModel.findOne(request.body, function (error, user) {
    if (!error && user) {
      console.log("req sess " + request.session.user)
      request.session.user = user;
      console.log("req sess " + request.session.user)
      responseData.user = user;
      responseData.success = true;
    }
    callback.call(null, response, responseData);
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