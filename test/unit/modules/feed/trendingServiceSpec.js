define(function (require) {
  'use strict';

  require([
    'angular',
    'app/modules/feed/services/trending'
  ]);

  var trendingService, constant, httpBackend, http;

  describe('Trending service:', function () {
    beforeEach(module('common.services.notifications', 'ui.router', 'fame.feed.trending'));

    beforeEach(function () {
      inject(function ($httpBackend, $http, _trendingService_, _FAME_CONSTANTS_) {
        http = $http,
          httpBackend = $httpBackend;
        trendingService = _trendingService_;
        constant = _FAME_CONSTANTS_;
      });
    });

    it('should be a valid service', function () {
      expect(trendingService).to.be.defined;
    });

    it('getTrending should work properly', function () {
      // Arrange
      var page = 1,
        perPage = 5,
        returnObject = [];
      for (var i = 0; i < perPage; i++) {
        returnObject.push({'player': i});
      }

      httpBackend.whenGET(constant.API_URL + '/trending?v=2&page=' + page + '&per_page=' + perPage).respond(returnObject);

      // Act
      var result;
      trendingService.getTrending(page, perPage).success(function (response) {
        result = response;
      });
      httpBackend.flush();

      // Assert
      expect(result.length).to.equal(perPage);
      expect(result).to.deep.equal(returnObject);
    });

    it('getTrending should set default perPage to 5', function () {
      // Arrange
      var page = 1,
        perPage = undefined;

      sinon.spy(http, 'get');

      httpBackend.whenGET(constant.API_URL + '/trending?v=2&page=' + page + '&per_page=' + 5).respond({});

      // Act
      trendingService.getTrending(page, perPage);
      httpBackend.flush();

      // Assert
      expect(http.get.calledWith(constant.API_URL + '/trending?v=2&page=' + page + '&per_page=' + 5)).to.be.true;
    });

    it('getTrending should set default page to 1', function () {
      // Arrange
      var page = undefined,
        perPage = 5;

      sinon.spy(http, 'get');

      httpBackend.whenGET(constant.API_URL + '/trending?v=2&page=' + 1 + '&per_page=' + perPage).respond({});

      // Act
      trendingService.getTrending(page, perPage);
      httpBackend.flush();

      // Assert
      expect(http.get.calledWith(constant.API_URL + '/trending?v=2&page=' + 1 + '&per_page=' + perPage)).to.be.true;
    });

    it('getTrending should set default page to 1 and perPage to 5', function () {
      // Arrange
      var page = undefined,
        perPage = undefined;

      sinon.spy(http, 'get');

      httpBackend.whenGET(constant.API_URL + '/trending?v=2&page=' + 1 + '&per_page=' + 5).respond({});

      // Act
      trendingService.getTrending(page, perPage);
      httpBackend.flush();

      // Assert
      expect(http.get.calledWith(constant.API_URL + '/trending?v=2&page=' + 1 + '&per_page=' + 5)).to.be.true;
    })
  })
});