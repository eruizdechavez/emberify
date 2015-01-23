'use strict';

module.exports = Ember.Route.extend({
  model: function () {
    return $.ajax({
      url: '/users'
    });
  }
});
