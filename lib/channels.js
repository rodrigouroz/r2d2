var needle = require('needle');
var moment = require('moment');
var PokeMessages = require('./pokeMessages');
var Q = require('q');
var util = require('./util');

function pokeChannel(channel, lastAction, bot) {
  'use strict';
  var message = PokeMessages.getMessage(channel, lastAction);
  var url = 'https://slack.com/api/chat.postMessage?token=' + bot.token +
    '&channel=' + channel.id + '&as_user=true&link_names=1&text=' + encodeURIComponent(message);
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

    needle.get('https://slack.com/api/channels.list?token=' + bot.token + '&exclude_archived=1',
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

    needle.get('https://slack.com/api/channels.history?channel=' + channel.id + '&token=' + bot.token,
      function (err, response) {

        var lastAction;

        if (err) {
          console.error(err);
          return;
        }

        if (response.statusCode === 200) {
          lastAction = getLastUserAction(response.body, bot);
          if (util.mustPoke(lastAction, new Date())) {
            pokeChannel(channel, lastAction, bot);
          }
        }
      });

  }

};
