define(function (require) {
  'use strict';

  require([
    'angular',
    'app/modules/feed/services/tracker'
  ]);

  var trackerService, constant, httpBackend;

  describe('Tracker service:', function () {
    beforeEach(module('common.services.notifications', 'ui.router', 'fame.feed.tracker'));

    beforeEach(function () {
      inject(function ($httpBackend, _trackerService_, _FAME_CONSTANTS_) {
        httpBackend = $httpBackend;
        trackerService = _trackerService_;
        constant = _FAME_CONSTANTS_;
      });
    });

    it('should be a valid service', function () {
      expect(trackerService).to.be.defined;
    });

    it('getTrackerPrice should work properly', function () {
      // Arrange
      var count = 10,
        returnObject = [];
      for (var i = 0; i < count; i++) {
        returnObject.push({'player': i});
      }

      httpBackend.whenGET(constant.API_URL + '/tracker' + count).respond(returnObject);

      // Act
      var result;
      trackerService.getTrackerPrice(count).success(function (response) {
        result = response;
      });
      httpBackend.flush();

      // Assert
      expect(result).to.deep.equal(returnObject);
    });

    it('buyTracker should work properly', function () {
      // Arrange
      var count = 10,
        returnObject = [];
      for (var i = 0; i < count; i++) {
        returnObject.push({'player': i});
      }

      httpBackend.whenGET(constant.API_URL + '/tracker' + count + '/buy').respond(returnObject);

      // Act
      var result;
      trackerService.buyTracker(count).success(function (response) {
        result = response;
      });
      httpBackend.flush();

      // Assert
      expect(result.length).to.equal(count);
      expect(result).to.deep.equal(returnObject);
    })
  })
});