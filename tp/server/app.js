var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var client = mongo.MongoClient;
var url = 'mongodb://localhost:27017/insa';

// Use connect method to connect to the Server
client.connect(url, function(err, connection) {
  console.log("Mongo is up and running !");
});

var findUser = function (db, login, callback) {
  db.collection('users', function (err, collection) {
    collection.find({ 'login': login }).toArray(function (err, result) {
      if (err) callback(err, result);
      callback(err, result[0]);
    });
  });
};

var insertUser = function (db, login, callback) {
  db.collection('users', function (err, collection) {
    collection.insert({ 'login': login, 'score': 0 }, callback);
  });
};

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.post('/register', function (req, res) {
  var login = req.param('login');
  console.log('Register login: ', login);
  if (!login) {
    res.status(400);
    res.json({
      status: 400,
      message: 'Please send a login'
    });
  }
  else {
    console.log('Try to find login ', login);
    client.connect(url, function (err, db) {
      findUser(db, login, function (err, user) {
        console.log('Result: ', user);
        if (!!user) {
          db.close();
          res.status(200);
          res.json(user);
        }
        else {
          console.log('Login does not exist, create it');
          insertUser(db, login, function (err, user) {
            db.close();
            res.status(200);
            res.json(user);
          });
        }
      });
    })
  }
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('App listening at http://%s:%s', host, port)

});