var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');

var app = express();

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var protocol = 'http';
var ip = '127.0.0.1';
var port = '3000';
var host = protocol + '://' + ip + ':' + port;
var tweetUrl = host + '/tweets';

app.get('/tweets', function (req, res) {
  console.log('GET: ', tweetUrl);
  http.get(tweetUrl, function(r) {
    r.pipe(res);
  });
});

app.post('/tweets', function (req, res) {
  console.log('POST: ', tweetUrl);

  var login = req.param('login');
  var message = req.param('message');

  if (!login || !message) {
    res.status(400);
    res.json({
      status: 400,
      message: 'Please send a login and a message'
    });
  }
  else {
    var data = {
      login: req.param('login'),
      message: req.param('message')
    };

    var str = JSON.stringify(data);

    var options = {
      hostname: ip,
      port: port,
      path: '/tweets',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': str.length
      }
    };

    var httpreq = http.request(options, function(r) {
      r.pipe(res);
    });

    // write data to request body
    httpreq.write(str);
    httpreq.end();
  }
});

// Start server
var server = app.listen(4000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port)
  console.log('Proxied host: ', host);
});
