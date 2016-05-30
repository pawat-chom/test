define(function(require) {
  'use strict';

  require('app/common/filters/chunk');

  describe('chunk filter', function() {
    var chunkFilter, input, result;

    beforeEach(function() {
      module('common.filters.chunk');

      inject(function($filter) {
        chunkFilter = $filter('chunk');
      })
    });

    it('should be a valid filter', function() {
      expect(chunkFilter).to.not.equal(null);
    });

    it('chunk should work properly', function() {
      // Arrange
      input = 'something';

      // Act
      result = chunkFilter(input);

      // Assert
      expect(result.length).to.equal(input.length);
      expect(result).to.deep.equal([["s"],["o"],["m"],["e"],["t"],["h"],["i"],["n"],["g"]]);
    });

    it('should return empty array if input is undefined', function() {
      // Arrange

      // Act
      var result = chunkFilter();

      // Assert
      expect(result).to.deep.equal([]);
    })
  })
});