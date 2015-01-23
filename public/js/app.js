'use strict';

var App = Ember.Application.create();

App.Router.map(require('./router'));
App.UserRoute = require('./user/user-route');
App.UserController = require('./user/user-controller');
App.UsersRoute = require('./users/users-route');
