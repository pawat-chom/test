define(function(require) {
  'use strict';

  require('app/common/filters/typeFormat');

  describe('typeFormat filter', function() {
    var filter;

    beforeEach(function() {
      module('common.filters.typeformat');

      inject(function($filter) {
        filter = $filter('typeformat');
      })
    });

    it('should be a valid filter', function() {
      expect(filter).to.not.equal(null);
    });

    it('should return corresponding action from input', function() {
      expect(filter('DEPOSIT')).to.equal('Deposit');
      expect(filter('PURCHASE')).to.equal('Purchased');
      expect(filter('SALE')).to.equal('Sold');
      expect(filter('DIVIDENDS')).to.equal('Buzz Win');
      expect(filter('COMMISSION')).to.equal('Commission');
      expect(filter('CLOSED')).to.equal('Closed');
      expect(filter('TYPE')).to.equal('TYPE');
      expect(filter()).to.equal();
    })
  })
});