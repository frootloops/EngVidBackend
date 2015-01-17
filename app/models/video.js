var mongoose      = require('mongoose');
var Schema        = mongoose.Schema;
var mongoosePages = require('mongoose-pages');

var VideoSchema   = new Schema({
  title: String,
  token: String,
  duration: String,
  author: String,
  tags : [String],
  image: String,
  description: String,
  external_id: Number
});

mongoosePages.skip(VideoSchema);

module.exports = mongoose.model('Video', VideoSchema);
