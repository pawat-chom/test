define(function (require) {
  'use strict';

  require([
    'angular',
    'app/modules/portfolio/services/portfolio'
  ]);

  var portfolioService, cashBalanceFactory, constant, httpBackend, q, rootScope,
    sandbox = sinon.sandbox.create();

  describe('Portfolio service:', function () {
    beforeEach(module('common.services.notifications', 'common.services.cashbalance', 'ui.router', 'fame.portfolio.portfolioService'))

    beforeEach(function () {
      inject(function ($httpBackend, $q, $rootScope, _portfolioService_, _cashBalanceFactory_, _FAME_CONSTANTS_) {
        httpBackend = $httpBackend;
        q = $q;
        rootScope = $rootScope;
        portfolioService = _portfolioService_;
        cashBalanceFactory = _cashBalanceFactory_;
        constant = _FAME_CONSTANTS_;
      })
    });

    it('should be a valid service', function () {
      expect(portfolioService).to.exist;
    });

    describe('getPortfolio', function () {
      it('getPortfolio should work properly', function () {
        // Arrange
        var id = 1,
          returnObject = {
            totals: [
              {id: 1},
              {id: 2}
            ]
          };
        sinon.spy(portfolioService, 'getPortfolio');
        httpBackend.whenGET(constant.API_URL + '/portfolio?history=false').respond(returnObject);

        // Act
        portfolioService.getPortfolio(id);
        httpBackend.flush();

        // Assert
        expect(portfolioService.getPortfolio.withArgs(id).calledOnce).to.be.true;
      });

      it('getPortfolio.success should work properly when id is defined', function () {
        // Arrange
        var id = 1,
          returnObject = {
            totals: [
              {id: 1},
              {id: 2}
            ]
          };

        sandbox.stub(portfolioService, 'getPortfolio', function () {
          var deferred = q.defer();
          deferred.resolve(returnObject);
          return deferred.promise;
        });

        // Act
        var result;
        portfolioService.getPortfolio(id).then(function (response) {
          result = response;
        });
        rootScope.$digest();

        // Assert
        expect(portfolioService.getPortfolio.calledOnce).to.be.true;
        expect(result).to.deep.equal(returnObject);
      });

      it('getPortfolio.success should work properly when id is undefined', function () {
        // Arrange
        var id = undefined;

        sandbox.stub(portfolioService, 'getPortfolio', function () {
          var deferred = q.defer();
          deferred.resolve(null);
          return deferred.promise;
        });

        // Act
        var result;
        portfolioService.getPortfolio(id).then(function (response) {
          result = response;
        });
        rootScope.$digest();

        // Assert
        expect(portfolioService.getPortfolio.calledOnce).to.be.true;
        expect(result).to.deep.equal(null);
      });

      it('getPortfolio.success should work properly when id is undefined', function () {
        // Arrange
        var id = undefined,
          returnObject = {
            totals: [
              {id: 1},
              {id: 2}
            ]
          };

        sandbox.stub(portfolioService, 'getPortfolio', function () {
          var deferred = q.defer();
          deferred.resolve(returnObject.totals);
          return deferred.promise;
        });

        // Act
        var result;
        portfolioService.getPortfolio(id).then(function (response) {
          result = response;
        });
        rootScope.$digest();

        // Assert
        expect(portfolioService.getPortfolio.calledOnce).to.be.true;
        expect(result).to.deep.equal(returnObject.totals);
      });

      it('getPortfolio.error should work properly', function () {
        // Arrange
        var id = 1;

        sandbox.stub(portfolioService, 'getPortfolio', function () {
          var deferred = q.defer();
          deferred.reject();
          return deferred.promise;
        });

        // Act
        portfolioService.getPortfolio(id);

        // Assert
        expect(portfolioService.getPortfolio.calledOnce).to.be.true;
      });
    });

    it('getPortfolioTotals should work properly', function () {
      // Arrange
      var returnObject = {
        totals: [
          {id: 1},
          {id: 2}
        ]
      };
      sinon.spy(portfolioService, 'getPortfolioTotals');
      httpBackend.whenGET(constant.API_URL + '/portfolio/totals').respond(returnObject);

      // Act
      var result;
      portfolioService.getPortfolioTotals().then(function (response) {
        result = response;
      });
      httpBackend.flush();

      // Assert
      expect(portfolioService.getPortfolioTotals.calledOnce).to.be.true;
      expect(result).to.deep.equal(returnObject);
    });

    it('writeDataToRootScope should work properly', function () {
      // Arrange
      var data = [1, 2, 3, 4];
      rootScope.portfolio = {};

      // Act
      portfolioService.writeDataToRootScope(data);

      // Assert
      expect(rootScope.portfolio.results).to.deep.equal(data);
    });

    it('cancel should work properly', function () {
      // Arrange
      var id = 1,
        returnObject = [1, 2, 3, 4];
      httpBackend.whenPOST(constant.API_URL + '/order/cancel', {celeb: id}).respond(returnObject);
      sinon.spy(portfolioService, 'cancel');

      // Act
      var result;
      portfolioService.cancel(id).then(function (data) {
        result = data;
      });
      httpBackend.flush();

      // Assert
      expect(portfolioService.cancel.calledOnce).to.be.true;
      expect(result).to.deep.equal(returnObject);
    });

    it('makeBuySell should work properly', function () {
      // Arrange
      var params = 1,
        returnObject = {
          cash: 1
        };
      rootScope.user = {};

      httpBackend.whenPOST(constant.API_URL + '/portfolio', params).respond([]);
      httpBackend.whenGET(constant.API_URL + '/cashbalance').respond(returnObject);
      sinon.spy(portfolioService, 'makeBuySell');
      sinon.spy(cashBalanceFactory, 'getBalance');

      // Act
      portfolioService.makeBuySell(params);
      httpBackend.flush();

      // Assert
      expect(portfolioService.makeBuySell.calledOnce).to.be.true;
      expect(cashBalanceFactory.getBalance.calledOnce).to.be.true;
      expect(rootScope.user.balance).to.deep.equal(returnObject.cash);
    });

    it('makeBuyTracker should work properly', function () {
      // Arrange
      var params = {
          id: 1,
          qty: 1
        },
        returnObject = {
          cash: 1
        };
      rootScope.user = {};

      httpBackend.whenGET(constant.API_URL + '/' + params.id + "/buy?qty=" + params.qty).respond([]);
      httpBackend.whenGET(constant.API_URL + '/cashbalance').respond(returnObject);
      sinon.spy(portfolioService, 'makeBuyTracker');
      sinon.spy(cashBalanceFactory, 'getBalance');

      // Act
      portfolioService.makeBuyTracker(params);
      httpBackend.flush();

      // Assert
      expect(portfolioService.makeBuyTracker.calledOnce).to.be.true;
      expect(cashBalanceFactory.getBalance.calledOnce).to.be.true;
      expect(rootScope.user.balance).to.deep.equal(returnObject.cash);
    });

    afterEach(function () {
      sandbox.restore();
    })
  })
});