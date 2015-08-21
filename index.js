var Channels = require('./channels');
var Bot = require('./bot');

var teamBot;

Bot.get()
  .then(function (bot) {
    'use strict';
    teamBot = bot;
    return Channels.findChannelsWhereBotIsInvited(bot);
  })
  .then(function (botChannels) {
    'use strict';
    var i;
    for (i = 0; i < botChannels.length; i++) {
      Channels.pokeChannelIfInactive(botChannels[i], teamBot);
    }
  })
  .catch(function (err) {
    'use strict';
    console.error(err);
  });
