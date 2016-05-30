define(function (require) {
  'use strict';

  require([
    'angular',
    'app/modules/feed/services/winners'
  ]);

  var winnersService, http, httpBackend, q, constant,
    sandbox = sinon.sandbox.create();

  describe('Winners Service:', function () {
    beforeEach(module('ui.router', 'common.services.notifications', 'fame.feed.winners'));

    beforeEach(function () {
      inject(function ($http, $httpBackend, $q, _FAME_CONSTANTS_, _winnersService_) {
        http = $http;
        httpBackend = $httpBackend;
        q = $q;
        constant = _FAME_CONSTANTS_;
        winnersService = _winnersService_;
      })
    });

    it('should be a valid service', function () {
      expect(winnersService).to.be.defined;
    });

    it('getWinners should work properly', function () {
      // Arrange

      sinon.spy(winnersService, 'getWinners');
      httpBackend.whenGET(constant.BUZZ_URL + '/winners/footballuk/5').respond([]);

      // Act
      winnersService.getWinners();
      httpBackend.flush();

      // Assert
      expect(winnersService.getWinners.calledOnce).to.be.true;
    });

    it('getWinners.success should work properly', function () {
      // Arrange
      sandbox.stub(winnersService, 'getWinners', function () {
        var deferred = q.defer();
        deferred.resolve();
        return deferred.promise;
      });

      // Act
      winnersService.getWinners();

      // Assert
      expect(winnersService.getWinners.calledOnce).to.be.true;
    });

    it('getWinners.error should work properly', function () {
      // Arrange
      sandbox.stub(winnersService, 'getWinners', function () {
        var deferred = q.defer();
        deferred.reject();
        return deferred.promise;
      });

      // Act
      winnersService.getWinners();

      // Assert
      expect(winnersService.getWinners.calledOnce).to.be.true;
    });

    it('getWinner should work properly', function () {
      // Arrange
      var returnObject = {
        items: [
          {player: 1}
        ]
      };

      sinon.spy(winnersService, 'getWinner');
      httpBackend.whenGET(constant.BUZZ_URL + '/winners/footballuk/1').respond(returnObject);

      // Act
      winnersService.getWinner();
      httpBackend.flush();

      // Assert
      expect(winnersService.getWinner.calledOnce).to.be.true;
    });

    it('getWinner.success should work properly', function () {
      // Arrange
      sandbox.stub(winnersService, 'getWinner', function () {
        var deferred = q.defer();
        deferred.resolve();
        return deferred.promise;
      });

      // Act
      winnersService.getWinner();

      // Assert
      expect(winnersService.getWinner.calledOnce).to.be.true;
    });

    it('getWinner.error should work properly', function () {
      // Arrange
      sandbox.stub(winnersService, 'getWinner', function () {
        var deferred = q.defer();
        deferred.reject();
        return deferred.promise;
      });

      // Act
      winnersService.getWinner();

      // Assert
      expect(winnersService.getWinner.calledOnce).to.be.true;
    });
  })
});