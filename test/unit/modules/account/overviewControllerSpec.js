define(function(require) {
  'use strict';

  require([
    'angular',
    'app/modules/account/account'
  ]);

  var overviewController, rootScope, scope, portfolioService, httpBackend, constant;

  describe('overview controller: ', function() {
    beforeEach(module('ui.router', 'common.services.notifications', 'fame.account',
      'fame.portfolio', 'fame.portfolio.portfolioService', 'common.services.cashbalance'));

    beforeEach(inject(function($controller, $rootScope, _portfolioService_, $httpBackend, _FAME_CONSTANTS_) {
      rootScope = $rootScope;
      scope = $rootScope.$new();
      portfolioService = _portfolioService_;
      httpBackend = $httpBackend;
      constant = _FAME_CONSTANTS_;

      overviewController = $controller('overviewController', {
        $scope: scope,
        portfolioService: portfolioService
      })
    }));

    it('should be a valid controller', function() {
      expect(overviewController).to.be.defined;
    });

    it('default values should be set', function() {
      expect(scope.portfolioTotals).to.equal(false);
    });

    it('reload should work properly', function() {
      // Arrange
      sinon.spy(portfolioService, 'getPortfolioTotals');
      //var returnObject = 10;
      //httpBackend.whenGET(constant.API_URL + '/portfolio/totals').respond(returnObject);
      //rootScope.portfolio = {
      //  totals: 0
      //};

      // Act
      scope.reload();
      //httpBackend.flush();

      // Assert
      expect(portfolioService.getPortfolioTotals.calledOnce).to.equal(true);
      //expect(rootScope.portfolio.totals).to.equal(returnObject);
    });
  })
});