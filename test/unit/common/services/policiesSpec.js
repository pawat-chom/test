define(function(require) {
  'use strict';

  require('app/common/services/policies');

  describe('policies service', function() {
    var httpBackend, constant, policiesService;

    beforeEach(function() {
      module('common.services.policies', 'common.services.notifications', 'ui.router');

      inject(function($httpBackend, _FAME_CONSTANTS_, _policiesService_) {
        httpBackend = $httpBackend;
        constant = _FAME_CONSTANTS_;
        policiesService = _policiesService_;
      })
    });

    it('expect service to be defined', function() {
      expect(policiesService).to.not.equal(null);
    });

    it('getFile() should return value from API call', function() {
      // Arrange
      var filename = 'filename', returnObject = 'data';
      httpBackend.expectGET(constant.API_URL + '/policies/' + filename).respond(returnObject);

      // Act
      var result;
      policiesService.getFile(filename).then(function(response) {
        result = response.data;
      });
      httpBackend.flush();

      // Assert
      expect(result).to.equal(returnObject);
    })
  });
});