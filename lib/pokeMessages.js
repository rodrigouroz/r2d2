var moment = require('moment');

exports = module.exports = {
  getMessage: function (channel, lastAction) {
    'use strict';
    var timeAgo = moment(lastAction).fromNow();
    return 'Hey @channel, last action here was ' + timeAgo + '. Please post a status.';
  }
};
