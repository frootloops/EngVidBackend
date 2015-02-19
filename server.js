// server.js

// BASE SETUP
// =============================================================================

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var mongoose   = require('mongoose');
mongoose.connect('mongodb://admin:admin@proximus.modulusmongo.net:27017/gyw6Ohej');

var Video = require('./app/models/video');

var router = express.Router();

router.use(function(req, res, next) {
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop
});

router.route('/videos')
  .post(function(req, res) {
    var video = new Video();
    video.title = req.body.title;

    video.save(function(err) {
      if (err) res.send(err);

      res.json({ message: 'Video created!' });
    });
  })
  .get(function(req, res) {
    var docsPerPage = 30;
    var pageNumber = req.param("page", 1);
    var q = req.param("q");
    var where = q && {"description": {$regex : ".*"+q+".*"}} || {}

    Video.findPaginated(where, function (err, result) {
      if (err) throw err;
      res.json(result)
    }, docsPerPage, pageNumber).sort('-external_id');
  })

router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/api', router);

// START THE SERVER
// =============================================================================

app.listen(port);
console.log('Magic happens on port ' + port);
