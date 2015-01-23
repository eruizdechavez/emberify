'use strict';

module.exports = Ember.Route.extend({
  model: function (params) {
    var user;

    return $.ajax({
      url: '/users/' + params.screen_name
    }).then(function (data) {
      user = data;
      return $.ajax({
        url: '/users/' + params.screen_name + '/tweets'
      });
    }).then(function (tweets) {
      user.tweets = tweets;
      return user;
    });
  },

  setupController: function (controller, user) {
    controller.set('model', user);
  }
});
