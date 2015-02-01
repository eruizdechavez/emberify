'use strict';

module.exports = function (App) {
  App.UsersRoute = Ember.Route.extend({
    model: function () {
      return $.ajax({
        url: '/users'
      });
    }
  });
};
