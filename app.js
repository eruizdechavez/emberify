'use strict';

// Dependencies
var express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  app = express();

// Data
var users = require('./data/users.json'),
  tweets = require('./data/tweets.json');

// Config. app
app.set('port', 3030);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/users', function (req, res) {
  res.send(users);
});

app.get('/users/:screen_name', function (req, res) {
  var user;

  users.every(function (item) {
    if (item.screen_name === req.params.screen_name) {
      user = item;
      return false;
    }
    return true;
  });

  res.send(user);
});

app.get('/users/:screen_name/tweets', function (req, res) {
  res.send(tweets);
});

// Start app
app.listen(app.get('port'), function () {
  console.log('Express app is running');
});
