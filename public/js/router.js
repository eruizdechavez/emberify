'use strict';

module.exports = function () {
  this.resource('users', {
    path: '/'
  });

  this.resource('user', {
    path: '/:screen_name'
  });
};
