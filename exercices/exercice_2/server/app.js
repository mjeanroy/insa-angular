var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var socketIo = require('socket.io');
var io;

var app = express();

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var protocol = 'http';
var ip = '127.0.0.1';
var port = '3000';
var host = protocol + '://' + ip + ':' + port;
var tweetUrl = host + '/tweets';

var $$tweets = [{
  login: 'foo',
  message: 'hello world'
}];

app.get('/tweets', function (req, res) {
  console.log('GET: ', tweetUrl);
  res.status(200);
  res.json($$tweets);
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

    $$tweets.push(data);

    io.emit('tweet:new', data);
    res.status(200);
    res.json(data);
  }
});

// Start server
var server = app.listen(4000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port)
  console.log('Proxied host: ', host);
});

io = socketIo.listen(server);

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});
