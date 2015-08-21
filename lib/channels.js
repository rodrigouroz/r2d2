var needle = require('needle');
var config = require('../config/config');
var moment = require('moment');
var pokeMessages = require('./pokeMessages');
var Q = require('q');

function mustPoke(lastAction) {
  'use strict';
  var days = Math.round(moment(new Date()).diff(lastAction, 'days', true));
  var weekday = new Date().getDay();
  // only poke if it's a business day and it's been more than 2 days of the last action
  return weekday > 0 && weekday < 6 && days >= 2;
}

function pokeChannel(channel, lastAction, bot) {
  'use strict';
  var message = pokeMessages.getMessage(channel, lastAction);
  var url = 'https://slack.com/api/chat.postMessage?token=' + bot.token +
    '&channel=' + channel.id + '&as_user=true&text=' + encodeURIComponent(message);
  needle.get(url);
}

function getLastUserAction(history, bot) {
  'use strict';
  var i;
  var isUserAction;
  var message;
  for (i = 0; i < history.messages.length; i++) {
    message = history.messages[i];
    isUserAction = message.user !== bot.userId && (!message.subtype || message.subtype === 'bot_message');
    if (isUserAction) {
      return new Date(history.messages[i].ts * 1000);
    }
  }
}

exports = module.exports = {

  findChannelsWhereBotIsInvited: function (bot) {
    'use strict';

    var deferred = Q.defer();

    needle.get('https://slack.com/api/channels.list?token=' + config.token + '&exclude_archived=1',
      function (err, response) {

        var botChannels = [];
        var i;

        if (err) {
          console.error(err);
          return deferred.reject(err);
        }

        if (response.statusCode === 200) {

          for (i = 0; i < response.body.channels.length; i++) {

            if (response.body.channels[i].members.indexOf(bot.userId) !== -1) {
              botChannels.push(response.body.channels[i]);
            }

          }

          return deferred.resolve(botChannels);
        }

        return deferred.reject();
      });

    return deferred.promise;

  },

  pokeChannelIfInactive: function (channel, bot) {
    'use strict';

    if (channel.name === 'general') {
      return;
    }

    needle.get('https://slack.com/api/channels.history?channel=' + channel.id + '&token=' + config.token,
      function (err, response) {

        var lastAction;

        if (err) {
          console.error(err);
          return;
        }

        if (response.statusCode === 200) {
          lastAction = getLastUserAction(response.body, bot);
          if (mustPoke(lastAction)) {
            pokeChannel(channel, lastAction, bot);
          }
        }
      });

  }

};
