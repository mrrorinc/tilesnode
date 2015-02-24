var MAX_TILES_TO_PULL = 192;

function home(request, response, callback, database) {
  database.TileModel.find({})
  .sort({
    created: -1
  })
  .limit(MAX_TILES_TO_PULL)
  .exec(
    function (error, tiles) {
      if (error) {
        callback.call(null, response, error);
      } else {
        callback.call(null, response, tiles);
      }
  });  
}

function selfStream(request, response, callback, database) {
  database.TileModel.find({
    streamID: request.session.user.streamID
  })
  .sort({
    created: -1
  })
  .limit(MAX_TILES_TO_PULL)
  .exec(
   function (error, tiles) {
    if (error) {
      callback.call(null, response, error);
    } else {
      callback.call(null, response, tiles);
    }
  });  
}

function memberStream(request, response, callback, database) {
  database.StreamModel.findOne({
    publisherName: request.params.username
  })
  .exec(
    function (error, stream) {
      database.TileModel.find({
        streamID: stream._id
      })
      .sort({
        created: -1
      })
      .limit(MAX_TILES_TO_PULL)
      .exec(
       function (error, tiles) {
        if (error) {
          callback.call(null, response, error);
        } else {
          callback.call(null, response, tiles);
        }
      });
    }
  );
}

function info(request, response, callback, database) {
  database.StreamModel.findOne({
    _id: request.params.streamID
  })
  .exec(
    function (error, stream) {
     if (error) {
       callback.call(null, response, error);
     } else {
       callback.call(null, response, stream);
     }
   }
  );
}

exports.home = home;
exports.selfStream = selfStream;
exports.memberStream = memberStream;
exports.info = info;