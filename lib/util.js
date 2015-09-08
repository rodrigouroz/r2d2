var moment = require('moment');

exports = module.exports = {

  mustPoke: function (lastAction, dateToCompare) {
    'use strict';

    var days;
    var businessDays = 0;
    var whenToCompare = moment(dateToCompare);
    var weekday = whenToCompare.weekday();
    // don't poke on weekends
    if (weekday === 0 || weekday === 6) {
      return false;
    }
    days = Math.round(whenToCompare.diff(lastAction, 'days', true));

    while (days > 0) {
      if (weekday > 0 && weekday < 6) {
        businessDays++;
      }
      whenToCompare.subtract(1, 'd');
      days = Math.round(whenToCompare.diff(lastAction, 'days', true));
      weekday = whenToCompare.weekday();
    }

    return businessDays > 2;
  }

};
