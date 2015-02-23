var mongoose = require('mongoose');

function initialize() {
  var databaseURL = "tiles";
  database = mongoose.connect('mongodb://localhost/' + databaseURL);
  console.log("Database initialized.");
  return database;
}
exports.initialize = initialize;

var Schema = mongoose.Schema;

var Tile = new Schema({
  background: { type: String, required: true },
  caption: { type: String, required: false },
  color: { type: String, required: true },
  created: { type: Date, required: true, default: Date.now },
  imageURL: { type: String, required: false },
  linkURL: { type: String, required: false },
  pWidth: { type: Number, required: true },
  pHeight: { type: Number, required: true },
<<<<<<< HEAD
  streamID: { type: String, required: true },
=======
  publisher: { type: String, required: true },
>>>>>>> 2bb3253a8d159ec4deb25c9221d36eb972c388d2
  updated: { type: Date, required: true, default: Date.now }
});
var TileModel = mongoose.model('Tile', Tile);  
exports.TileModel = TileModel;

<<<<<<< HEAD
var Stream = new Schema({
  created: { type: Date, required: true, default: Date.now },
  promoted: { type: Boolean, required: true, default: false },
  publisherName: { type: String, required: true },
  suspended: { type: Boolean, required: true, default: false },
  streamName: { type: String, required: false },
  updated: { type: Date, required: true, default: Date.now }
});
var StreamModel = mongoose.model('Stream', Stream);  
exports.StreamModel = StreamModel;

var User = new Schema({
  created: { type: Date, required: true, default: Date.now },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  realm: { type: String, required: true },
  username: { type: String, required: true, unique: true },
=======
var User = new Schema({
  created: { type: Date, required: true, default: Date.now },
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
>>>>>>> 2bb3253a8d159ec4deb25c9221d36eb972c388d2
  updated: { type: Date, required: true, default: Date.now }
});
var UserModel = mongoose.model('User', User);  
exports.UserModel = UserModel;