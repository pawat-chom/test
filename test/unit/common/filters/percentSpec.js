define(function(require) {
  'use strict';

  require('app/common/filters/percent');

  describe('percent filter', function() {
    var filter;

    beforeEach(function() {
      module('common.filters.percent');

      inject(function($filter) {
        filter = $filter('percent');
      })
    });

    it('should be a valid filter', function() {
      expect(filter).to.not.equal(null);
    });

    it('should return calculated percent when input\'s sell is truthy', function() {
      // Arrange
      var change = 100,
        item = {
          sell: true,
          sellcost: 10,
          sellqty: 2
        };

      // Act
      var result = filter(change, item);

      // Assert
      expect(result).to.equal((change/ (item.sellcost * item.sellqty) * 100).toFixed(2));
    });

    it('should return calculated percent when input\'s sell is falsy', function() {
      // Arrange
      var change = 100,
        item = {
          sell: false,
          sellcost: 10,
          sellqty: 2,
          totalCost: 500
        };

      // Act
      var result = filter(change, item);

      // Assert
      expect(result).to.equal((change/ item.totalCost * 100).toFixed(2));
    });

    it('should return 0 if input\'s sell is falsy and no totalCost', function() {
      // Arrange
      var change = 100,
        item = {};

      // Act
      var result = filter(change, item);

      // Assert
      expect(result).to.equal('0.00');
    });

    //it('should return error if input is undefined', function() {
    //  expect(filter()).to.throw();
    //})
  })
});