var moment = require('moment');

exports = module.exports = {
  getMessage: function (channel, lastAction) {
    'use strict';
    var timeAgo = moment(lastAction).fromNow();
    return 'Last action on this channel was ' + timeAgo + '. Please post a status.';
  }
};
