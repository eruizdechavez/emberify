'use strict';

module.exports = function (App) {
  App.Router.map(function () {
    this.resource('users', {
      path: '/'
    });
  });
};
