var MAX_TILES_TO_PULL = 192;

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

exports.selfStream = selfStream;
exports.memberStream = memberStream;
exports.home = home;