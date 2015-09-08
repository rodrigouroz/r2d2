var assert = require('assert');
var util = require('../lib/util');

describe('Util', function () {
  'use strict';

  describe('Poking', function () {

    it('should not poke if there has not been more than 2 business days', function () {
      var lastAction = new Date('2015-08-28T09:00:00');
      var whenToCompare = new Date('2015-08-31T09:00:00');
      assert.equal(false, util.mustPoke(lastAction, whenToCompare));
    });

    it('should not poke on weekends', function () {
      var lastAction = new Date('2015-09-07T09:00:00');
      var whenToCompare = new Date('2015-09-12T09:00:00');
      assert.equal(false, util.mustPoke(lastAction, whenToCompare));
    });

    it('should poke if there has been more than 2 business days', function () {
      var lastAction = new Date('2015-08-28T09:00:00');
      var whenToCompare = new Date('2015-09-02T09:00:00');
      assert.equal(true, util.mustPoke(lastAction, whenToCompare));

      lastAction = new Date('2015-09-07T09:00:00');
      whenToCompare = new Date('2015-09-11T09:00:00');
      assert.equal(true, util.mustPoke(lastAction, whenToCompare));
    });

  });

});
