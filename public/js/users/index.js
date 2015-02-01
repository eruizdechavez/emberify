'use strict';

module.exports = function (App) {
  require('./router')(App);
  require('./route')(App);
};
