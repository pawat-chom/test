define(function(require) {
  'use strict';

  require('app/common/services/svgImageLoader');

  describe('svgImageLoader service', function() {
    var httpBackend, svgImageLoader;

    beforeEach(function() {
      module('common.services.svgImageLoader', 'ui.router');

      inject(function($httpBackend, _svgImageLoader_) {
        httpBackend = $httpBackend;
        svgImageLoader = _svgImageLoader_;
      })
    });

    it('expect service to be defined', function() {
      expect(svgImageLoader).to.not.equal(null);
    });

    it('load() should get image if not in cache', function() {
      // Arrange
      var imgUrl = 'url', imageCache = {}, returnObject = 'data';
      httpBackend.expectGET(imgUrl).respond(returnObject);

      // Act
      svgImageLoader.load(imgUrl).then(function(response) {
        imageCache[imgUrl] = response;
      });
      httpBackend.flush();

      // Assert
      expect(imageCache[imgUrl]).to.equal(returnObject);
    });
  });
});