define(function(require) {
  'use strict';

  require('app/common/filters/dayOfWeek');

  describe('dayOfWeek filter', function() {
    var dayOfWeekFilter, input, result;

    beforeEach(function() {
      module('common.filters.dayOfWeek');

      inject(function($filter) {
        dayOfWeekFilter = $filter('dayOfWeek');
      })
    });

    it('should be a valid filter', function() {
      expect(dayOfWeekFilter).to.not.equal(null);
    });

    it('should work properly', function() {
      // Arrange
      input = '20151008';

      // Act
      result = dayOfWeekFilter(input);

      // Assert
      expect(result).to.equal('Thu');
    });

    it('should return dash if input length is not 8', function() {
      // Arrange
      input = 'something';

      // Act
      result = dayOfWeekFilter(input);

      // Assert
      expect(result).to.equal('&ndash;');
    });

    //it('should return error if input is undefined', function() {
    //  expect(filter()).to.throw();
    //})
  })
});