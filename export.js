var request = require("request");
var cheerio = require("cheerio");
var Video = require('./app/models/video');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://admin:admin@proximus.modulusmongo.net:27017/gyw6Ohej');
var videos = require('./videos.js')

// Video.remove({}, function(err) { console.log('collection removed'); });
videos.forEach(function(video) {
    request(video, function (error, response, html) {
      var $ = cheerio.load(html);
      if($('meta[property="og:video"]').attr("content")) {
      var title = $('[property="dc:title"]').text()
      var author = $('[property="dc:creator"]').text().trim()
      var token = $('meta[property="og:video"]').attr("content").match(/\/v\/(.+)\&r/)[1]
      var tags = $(".featured_category_list a").map(function(i, a) { return $(a).text() }).get()
      var description = $('[property="dc:description"]').text()
      var id = parseInt($('.featured_post').attr("id").replace(/[^0-9]/g, ''))


      var model = new Video()
      model.title = title
      model.author = author
      model.token = token
      model.tags = tags
      model.external_id = id
      model.description = description
      model.save(function() {
      })

      console.log(title);
      }
    });
  }
);

console.log("End")
