function list(request, response, callback, database) {
  database.TileModel.find(function (error, tiles) {
    if (error) {
      callback.call(null, response, error);
    } else {
      callback.call(null, response, tiles);
    }
  });  
}

function getTile(request, response, callback, database) {
  database.TileModel.findById(request.params.id, function (error, tile) {
    if (error) {
      callback.call(null, response, error);
    } else {
      callback.call(null, response, tile);
    }
  });
}

function post(request, response, callback, database) {
  var responseData = {
    success: false
  };
  if (request.body.caption || request.body.imageURL)
  {
    responseData.success = true;
  } else {
    responseData.error = "please provide caption or image!";
  }
  if (responseData.success)
  {
    var newTile = new database.TileModel(request.body);
    newTile.streamID = request.session.user.streamID;
    newTile.save(function(error) {
      responseData.tile = newTile;
      request.session.tile = newTile;
      callback.call(null, response, responseData);
    });
  } else {
    callback.call(null, response, responseData);
  }
}

exports.list = list;
exports.getTile = getTile;
exports.post = post;