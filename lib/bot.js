var needle = require('needle');
var Q = require('q');

var bot = {
  token: process.env.BOT_TOKEN //eslint-disable-line
};

exports = module.exports = {

  get: function () {
    'use strict';

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
