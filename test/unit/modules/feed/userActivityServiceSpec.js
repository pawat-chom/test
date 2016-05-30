define(function (require) {
  'use strict';

  require([
    'angular',
    'app/modules/feed/services/userActivity'
  ]);

  var userActivityService, httpBackend, constant;

  describe('UserActivity service:', function () {
    beforeEach(module('ui.router', 'common.services.notifications', 'fame.feed.userActivity'));

    beforeEach(function () {
      inject(function ($httpBackend, _FAME_CONSTANTS_, _userActivityService_) {
        httpBackend = $httpBackend;
        constant = _FAME_CONSTANTS_;
        userActivityService = _userActivityService_;
      })
    });

    it('should be a valid service', function () {
      expect(userActivityService).to.be.defined;
    });

    it('getUserActivity should work properly', function () {
      // Arrange
      var count = 10,
        returnObject = [];

      for (var i = 0; i < count; i++) {
        returnObject.push({'player': i})
      }

      httpBackend.whenGET(constant.API_URL + '/transactions/activity?num=' + count).respond(returnObject);

      // Act
      var result;
      userActivityService.getUserActivity(count).success(function (response) {
        result = response;
      });
      httpBackend.flush();

      // Assert
      expect(result).to.deep.equal(returnObject);
    })
  })
});