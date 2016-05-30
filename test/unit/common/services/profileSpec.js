define(function (require) {
  'use strict';

  require('app/common/services/profile');

  var httpBackend, profileFactory, constant;

  describe('Profile service', function () {
    beforeEach(function () {
      module('common.services.profile', 'common.services.notifications', 'ui.router');

      inject(function ($httpBackend, _profileFactory_, _FAME_CONSTANTS_) {
        httpBackend = $httpBackend;
        profileFactory = _profileFactory_;
        constant = _FAME_CONSTANTS_;
      });
    });

    it('should be a valid service', function () {
      expect(profileFactory).to.not.equal(null);
    });

    it('should have getProfile working', function () {
      var id = 'luke-shaw',
        returnData = {"attributes": {"profile-image": {"value": "luke-shaw-g-p1.jpg"}}},
        url = constant.API_URL + '/account/profile';
      httpBackend.expectGET(url).respond(returnData);

      var result;
      profileFactory.getProfile(id).then(function (res) {
        result = res;
      });

      httpBackend.flush();

      expect(result).to.deep.equal(returnData);
    });

    it('setProfile() should return result from API call', function() {
      // Arrange
      var data = 'data', returnObject = 'returnObject';
      httpBackend.whenPOST(constant.API_URL + '/account/profile', data).respond(returnObject);

      // Act
      var result;
      profileFactory.setProfile(data).then(function(response) {
        result = response;
      });
      httpBackend.flush();

      // Assert
      expect(result).to.equal(returnObject);
    });

    it('getUserInfo() should return data from API call', function() {
      // Arrange
      var returnObject = 'returnObject';
      httpBackend.whenGET(constant.API_URL + '/user').respond(returnObject);

      // Act
      var result;
      profileFactory.getUserInfo().then(function(response) {
        result = response;
      });
      httpBackend.flush();

      // Assert
      expect(result).to.equal(returnObject);
    })
  });
});