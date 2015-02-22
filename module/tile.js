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

exports.list = list;
exports.getTile = getTile;