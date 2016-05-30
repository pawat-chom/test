define(function (require) {
  'use strict';

  require('app/common/filters/dateFormat');

  describe('dateFormat filter', function () {
    var dateFormatFilter, datetimeformatFilter, input, result;

    beforeEach(function () {
      module('common.filters.dateformat');

      inject(function ($filter) {
        dateFormatFilter = $filter('dateformat');
        datetimeformatFilter = $filter('datetimeformat');
      })
    });

    it('should be a valid filter', function () {
      expect(dateFormatFilter).to.not.equal(null);
    });

    describe('dateformat', function () {
      it('should work properly when input is a valid date', function () {
        // Arrange
        input = new Date('2015-10-08');

        // Act
        result = dateFormatFilter(input);

        // Assert
        expect(result).to.equal('Thu, 08/10/2015');
      });

      it('should not work properly when input is a invalid date', function () {
        // Arrange
        input = new Date('something');

        // Act
        result = dateFormatFilter(input);

        // Assert
        expect(result).to.not.equal('Thu, 08/10/2015');
      });

      it('should return undefined if input is undefined', function() {
        // Arrange

        // Act
        var result = dateFormatFilter();

        // Assert
        expect(result).to.contain('undefined');
      })
    });

    describe('datetimeformat', function() {
      it('should work properly when input is a valid date time', function () {
        // Arrange
        input = new Date('2015-10-08');

        // Act
        result = datetimeformatFilter(input);

        // Assert
        expect(result).to.equal('Thu, 08/10/15 0:00:00');
      });

      it('should not work properly when input is a invalid date time', function () {
        // Arrange
        input = new Date('something');

        // Act
        result = datetimeformatFilter(input);

        // Assert
        expect(result).to.not.equal('Thu, 08/10/15 0:00:00');
      });

      it('should return undefined if input is undefined', function() {
        // Arrange

        // Act
        var result = datetimeformatFilter();

        // Assert
        expect(result).to.contain('undefined');
      })
    });
  })
});