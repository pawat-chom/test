define(function () {
  'use strict';

  require([
    'angular',
    'app/modules/portfolio/portfolio'
  ]);

  var portfolioController, rootScope, scope, localStorageService, httpBackend, constant,
    portfolioService, notifications;

  describe('Portfolio Controller:', function () {
    beforeEach(module('ui.router', 'common.services.notifications', 'common.services.cashbalance', 'fame.portfolio'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend, storage, _notifications_, _portfolioService_, _FAME_CONSTANTS_) {
      scope = {
        showLoading: function() {},
        doRefresh: function() {},
        $on: function() {},
        $broadcast: function() {}
      };
      httpBackend = $httpBackend;
      constant = _FAME_CONSTANTS_;
      rootScope = $rootScope;
      localStorageService = storage;
      notifications = _notifications_;
      portfolioService = _portfolioService_;

      portfolioController = $controller('portfoliocontrol', {
        $scope: scope,
        notifications: notifications,
        storage: localStorageService,
        portfolioService: portfolioService
      });
    }));

    it('should be a valid controller', function () {
      expect(portfolioController).to.be.defined;
    });

    it('default values should be set', function() {
      // Arrange
      localStorageService.set('user-balance', 123);
      sinon.spy(scope, 'doRefresh');
      sinon.spy(notifications, 'onUpdatePortfolio');

      // Act

      // Assert
      expect(scope.viewMode).to.equal('percents');
      expect(scope.viewPeriod).to.equal('all');
      expect(scope.viewDetail).to.equal(false);
      expect(scope.userDetail).to.deep.equal({});
      expect(rootScope.portfolio.results).to.deep.equal([]);
      //expect(scope.balance).to.deep.equal(123)
      expect(scope.periods).to.deep.equal({
        all: 't',
        '7day': 'w',
        '24hr': 'd'
      });
      //expect(scope.doRefresh.called).to.be.true;
      //expect(notifications.onUpdatePortfolio.called).to.be.true;
    });

    it('setViewMode should work properly', function() {
      // Arrange
      var mode = 'dev';

      // Act
      scope.setViewMode(mode);

      // Assert
      expect(scope.viewMode).to.equal(mode);
    });

    it('toggle should work properly when $scope.viewDetail is undefined', function() {
      // Arrange

      // Act
      scope.toggle();

      // Assert
      expect(scope.viewDetail).to.equal(true);
    });

    it('toggle should work properly when $scope.viewDetail is defined', function() {
      // Arrange
      scope.viewDetail = 'something';

      // Act
      scope.toggle();

      // Assert
      expect(scope.viewDetail).to.deep.equal(false);
      expect(scope.userDetail).to.deep.equal({});
    });

    it('showDetailView should work properly', function() {
      // Arrange
      var result = 'result';
      sinon.spy(scope, 'toggle');

      // Act
      scope.showDetailView(result);

      // Assert
      expect(scope.toggle.calledOnce).to.be.true;
      expect(scope.userDetail).to.equal(result);
    });

    it('setViewPeriod should work properly', function() {
      // Arrange
      var period = 'period';

      // Act
      scope.setViewPeriod(period);

      // Assert
      expect(scope.viewPeriod).to.equal(period);
    });

    it('cancelOrder should work properly', function() {
      // Arrange
      var id = 1;
      sinon.spy(scope, 'showLoading');
      sinon.spy(scope, 'doRefresh');
      sinon.spy(portfolioService, 'cancel');

      // Act
      scope.cancelOrder(id);

      // Assert
      expect(scope.showLoading.calledOnce).to.be.true;
      expect(portfolioService.cancel.called).to.be.true;
    });

    it('doRefresh should work properly', function() {
      // Arrange
      var data = [1, 2, 3, 4];
      rootScope.portfolio = {};
      sinon.spy(portfolioService, 'getPortfolioTotals');
      sinon.spy(portfolioService, 'getPortfolio');
      sinon.spy(scope, 'doRefresh');

      httpBackend.whenGET(constant.API_URL + '/portfolio/totals').respond(data);
      httpBackend.whenGET(constant.API_URL + '/portfolio?history=false').respond([]);

      // Act
      scope.doRefresh();
      httpBackend.flush();

      // Assert
      expect(portfolioService.getPortfolioTotals.calledOnce).to.be.true;
      expect(portfolioService.getPortfolio.calledOnce).to.be.true;
      expect(rootScope.portfolio.totals).to.deep.equal(data);
      //expect(scope.doRefresh.called).to.be.true;
      //expect(scope.$broadcast.called).to.be.true;
    })
  });
});