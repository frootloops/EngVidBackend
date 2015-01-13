var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var VideoSchema   = new Schema({
  title: String,
  token: String,
  duration: String,
  author: String,
  tags : [String],
  image: String
});

module.exports = mongoose.model('Video', VideoSchema);
