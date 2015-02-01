'use strict';

// Dependencies
var express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  util = require('util'),
  config = require('indecent'),
  app = express();

var Twitter = require('twitter-js-client').Twitter,
  twitter = new Twitter(config);

// Config. app
app.set('port', config.port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/users', function (req, res) {
  res.send(require('./users'));
});

app.get('/users/:screen_name', function (req, res) {
  twitter.getUser({
    screen_name: req.params.screen_name
  }, function (err) {
    console.log('ERROR [%s]', util.inspect(err));
  }, function (data) {
    res.send(JSON.parse(data));
  });
});

app.get('/users/:screen_name/tweets', function (req, res) {
  twitter.getUserTimeline({
    screen_name: req.params.screen_name
  }, function (err) {
    console.log('ERROR [%s]', util.inspect(err));
  }, function (data) {
    res.send(JSON.parse(data));
  });
});

// Start app
app.listen(app.get('port'), function () {
  console.log('Express app is running on port ' + config.port);
});
