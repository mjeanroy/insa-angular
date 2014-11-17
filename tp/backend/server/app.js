var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');

var app = express();

app.use(express.static(__dirname + '/../app'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var client = mongo.MongoClient;
var url = 'mongodb://localhost:27017/insa';
var db;

// Use connect method to connect to the Server
client.connect(url, function(err, connection) {
  db = connection;
  console.log("Mongo is up and running !");
});

var findUser = function (login, callback) {
  db.collection('users', function (err, collection) {
    collection.find({ 'login': login }).toArray(function (err, result) {
      if (err) callback(err, result);
      callback(err, result[0]);
    });
  });
};

var findUsers = function (callback) {
  db.collection('users', function (err, collection) {
    collection
      .find()
      .sort({score: -1})
      .toArray(function (err, result) {
        if (err) callback(err, result);
        callback(err, result);
      });
  });
};

var findTweets = function (callback) {
  db.collection('tweets', function (err, collection) {
    collection
      .find()
      .sort({time: -1})
      .toArray(function (err, result) {
        if (err) callback(err, result);
        callback(err, result);
      });
  });
};

var insertUser = function (login, callback) {
  db.collection('users', function (err, collection) {
    var user = {
      'login': login,
      'score': 0,
      'step': 0
    };
    collection.insert({ 'login': login, 'score': 0, 'step': 0 }, callback);
  });
};

var updateUser = function (user, step, addPoint, callback) {
  db.collection('users', function (err, collection) {
    var query = {
      step: step,
      score: user.score + addPoint
    };

    collection.update({ 'login': user.login }, { $set: query }, callback);
  });
};

var insertTweets = function (login, message, callback) {
  db.collection('tweets', function (err, collection) {
  	if (err) callback(err, collection);
  	else {
      var tweet = {
        'login': login,
        'message': message,
        'time': new Date()
      };

      collection.insert(tweet, callback);
    }
  });
};

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.get('/users', function (req, res) {
  findUsers(function (err, results) {
    res.status(200);
    res.json(results);
  });
});

app.get('/questions', function (req, res) {
  res.status(200);
  res.json([
    { id: 1, q: 'Quel est le message du tweet datant du 19 novembre à 8h00 ?'},
    { id: 2, q: 'Quel est le message du tweet datant du 19 novembre à 8h00 ?'},
    { id: 2, q: 'Quel est le message du tweet datant du 19 novembre à 8h00 ?'},
    { id: 2, q: 'Quel est le message du tweet datant du 19 novembre à 8h00 ?'},
    { id: 2, q: 'Quel est le message du tweet datant du 19 novembre à 8h00 ?'}
  ]);
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
  	login = login.trim();

    console.log('Try to find login ', login);
    findUser(login, function (err, user) {
      console.log('Result: ', user);
      if (!!user) {
        res.status(200);
        res.json(user);
      }
      else {
        console.log('Login does not exist, create it');
        insertUser(login, function (err, user) {
          res.status(200);
          res.json(user[0]);
        });
      }
    });
  }
});

app.get('/tweets', function (req, res) {
  findTweets(function (err, tweets) {
    res.json(tweets);
    res.status(200);
  });
});

app.post('/tweets', function (req, res) {
  var login = req.param('login');
  var message = req.param('message');
  if (!login || !message) {
    res.status(400);
    res.json({
      status: 400,
      message: 'Please send login and message'
    });
  }
  else {
    insertTweets(login, message, function (err, tweet) {
      if (err) console.log(err);
      res.json(tweet);
      res.status(200);
    });
  }
});

var onAnswer = function (res, expectedAnswer, answer, login) {
  if (answer && answer.toLowerCase() === expectedAnswer) {
    findUser(login, function (err, user) {
      if (!user.step || user.step === 0) {
        updateUser(user, 1, 10, function () {
          res.status(200);
          res.status('Congratulations !');
        });
      } else {
        res.status(200);
        res.send('Congratulations !');
      }
    });
  } else {
    res.status(400);
    res.send('Sorry, answer is not valid');
  }
};

// # Question 1
app.post('/q1', function (req, res) {
  onAnswer(res, 'hello insa !', req.param('answer'), req.param('login'));
});

// # Question 2
app.post('/q2', function (req, res) {
  // TODO
});

// # Question 3
app.post('/q3', function (req, res) {
  // TODO
});

// # Question 4
app.post('/q4', function (req, res) {
  // TODO
});

// # Question 5
app.post('/q5', function (req, res) {
  // TODO
});


var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('App listening at http://%s:%s', host, port)
});