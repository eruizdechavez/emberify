'use strict';

var App = Ember.Application.create();

require('./users')(App);
require('./user')(App);
