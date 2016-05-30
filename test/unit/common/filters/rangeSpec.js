define(function(require) {
  'use strict';

  require('app/common/filters/range');

  describe('range filter', function() {
    var filter;

    beforeEach(function() {
      module('common.filters.range');

      inject(function($filter) {
        filter = $filter('range');
      })
    });

    it('should be a valid filter', function() {
      expect(filter).to.not.equal(null);
    });

    it('should return an array from 0 to total\'s length - 1 when', function() {
      // Arrange
      var input = [], total = 5;

      // Act
      var result = filter(input, total);

      // Assert
      expect(result.length).to.equal(total);
      expect(result).to.deep.equal([0, 1, 2, 3, 4]);
    });

    it('should return original input if total is undefined', function() {
      // Arrange
      var input = [];

      // Act
      var result = filter(input);

      // Assert
      expect(result).to.deep.equal([]);
    });

    it('should return undefined if input is undefined', function() {
      // Arrange

      // Act
      var result = filter();

      // Assert
      expect(result).to.be.undefined;
    })
  })
});