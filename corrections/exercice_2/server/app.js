// Simple Backend
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var cors = require('cors');
var socketIo = require('socket.io');
var config = require('./config.json');
var io;

var app = express();

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(cors());

var port = config.port;
var host = config.backend + ':' + port;
var tweets = config.tweets;

var $tweets = [{
  login: 'mjeanroy',
  message: 'hello insa '
}];

app.get(tweets, function (req, res) {
  console.log('GET: ', tweets);
  res.status(200);
  res.json($tweets);
});

app.post(tweets, function (req, res) {
  console.log('POST: ', tweets);

  var login = req.param('login');
  var message = req.param('message');
  var isValid = !!login && !!message && message.length <= 140;

  if (!isValid) {
    res.status(400);
    res.json({
      status: 400,
      message: 'Please send a login and a message'
    });
  } else {
    var data = {
      login: login,
      message: message
    };

    $tweets.push(data);

    io.emit('tweet:new', data);
    res.status(201);
    res.json(data);
  }
});

// Start server
var server = app.listen(port, function () {
  console.log('App listening on port', server.address().port);
});

// Start WebSocket
io = socketIo.listen(server);

io.on('connection', function(socket) {
  console.log('user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});
