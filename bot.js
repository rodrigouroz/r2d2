var config = require('./config.js');
var needle = require('needle');
var Q = require('q');

var bot = {
  token: config.token
};

exports = module.exports = {

  get: function () {
    'use strict';

    if (bot.userId) {
      return bot;
    }

    var deferred = Q.defer();

    needle.get('https://slack.com/api/auth.test?token=' + bot.token, function (err, response) {

      if (err) {
        console.error(err);
        return deferred.reject(err);
      }

      if (response.statusCode === 200) {
        bot.username = response.body.user;
        bot.userId = response.body.user_id;
        return deferred.resolve(bot);
      }

      deferred.reject();

    });

    return deferred.promise;

  }

};
