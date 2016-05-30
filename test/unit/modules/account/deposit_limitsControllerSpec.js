define(function(require) {
  'use strict';

  var angular = require('angular');
  var notificationsService = require('app/common/services/notifications');
  var accountmodule = require('app/modules/account/account');

  var deposit_limitsController, rootScope, scope, financialService, notifications,
    httpBackend, constant;

  describe('deposit_limits controller:', function() {
    beforeEach(module('ui.router', 'common.services.notifications', 'fame.account'));

    beforeEach(inject(function($controller, $rootScope, _financialService_, $httpBackend, _FAME_CONSTANTS_, _notifications_) {
      rootScope = $rootScope;
      scope = {
        showLoading: function() {},
        $watch: function() {}
      };
      financialService = _financialService_;
      httpBackend = $httpBackend;
      constant = _FAME_CONSTANTS_;
      notifications = _notifications_;

      deposit_limitsController = $controller('deposit_limitsController', {
        $scope: scope,
        financialService: financialService,
        notifications: notifications
      })
    }));

    it('should be a valid controller', function() {
      expect(deposit_limitsController).to.be.defined;
    });

    it('default values should be set', function() {
      // Arrange
      sinon.spy(financialService, 'getDepositLimits');

      var returnObject = {
        "dailyLimit": 0,
        "dailyLimitConfirmed": false,
        "weeklyLimit": 0,
        "weeklyLimitConfirmed": false,
        "monthlyLimit": 0,
        "monthlyLimitConfirmed": false,
        "depositLimitLeft": 0,
        "previousDailyLimit": 0,
        "previousWeeklyLimit": 0,
        "previousMonthlyLimit": 0,
        "nextDailyLimit": 0,
        "nextDailyLimitRequestTime": "",
        "nextDailyLimitActivationTime": "",
        "nextWeeklyLimit": 0,
        "nextWeeklyLimitRequestTime": "",
        "nextWeeklyLimitActivationTime": "",
        "nextMonthlyLimit": 0,
        "nextMonthlyLimitRequestTime": "",
        "nextMonthlyLimitActivationTime": ""
      };
      httpBackend.whenGET(constant.API_URL + '/account/depositlimits').respond(returnObject);

      // Act
      httpBackend.flush();

      // Assert
      expect(parseInt(scope.limits.daily.value)).to.equal(returnObject.nextDailyLimit ? returnObject.nextDailyLimit : returnObject.dailyLimit );
      expect(parseInt(scope.limits.weekly.value)).to.equal(returnObject.nextWeeklyLimit ? returnObject.nextWeeklyLimit : returnObject.weeklyLimit );
      expect(parseInt(scope.limits.monthly.value)).to.equal(returnObject.nextMonthlyLimit ? returnObject.nextMonthlyLimit  : returnObject.monthlyLimit );

    });

    it('saveLimit should work properly', function() {
      // Arrange
      sinon.spy(financialService, 'getDepositLimits');
      sinon.spy(notifications, 'showMessage');

      var returnObject = {
        "dailyLimit": 0,
        "dailyLimitConfirmed": false,
        "weeklyLimit": 0,
        "weeklyLimitConfirmed": false,
        "monthlyLimit": 0,
        "monthlyLimitConfirmed": false,
        "depositLimitLeft": 0,
        "previousDailyLimit": 0,
        "previousWeeklyLimit": 0,
        "previousMonthlyLimit": 0,
        "nextDailyLimit": 0,
        "nextDailyLimitRequestTime": "",
        "nextDailyLimitActivationTime": "",
        "nextWeeklyLimit": 0,
        "nextWeeklyLimitRequestTime": "",
        "nextWeeklyLimitActivationTime": "",
        "nextMonthlyLimit": 0,
        "nextMonthlyLimitRequestTime": "",
        "nextMonthlyLimitActivationTime": ""
      };
      httpBackend.whenPOST(constant.API_URL + '/account/depositlimits').respond(returnObject);
      httpBackend.whenGET(constant.API_URL + '/account/depositlimits').respond(returnObject);

      scope.limits.daily.value  = 0;
      scope.limits.weekly.value = 0;
      scope.limits.monthly.value = 0;

      // Act
      scope.saveLimit();
      httpBackend.flush();

      // Assert
      expect(parseInt(scope.limits.daily.value)).to.equal(returnObject.nextDailyLimit ? returnObject.nextDailyLimit : returnObject.dailyLimit );
      expect(parseInt(scope.limits.weekly.value)).to.equal(returnObject.nextWeeklyLimit ? returnObject.nextWeeklyLimit : returnObject.weeklyLimit );
      expect(parseInt(scope.limits.monthly.value)).to.equal(returnObject.nextMonthlyLimit ? returnObject.nextMonthlyLimit  : returnObject.monthlyLimit );
      
    });

    it('showDepositPopup should work properly', function() {
      // Arrange
      sinon.spy(notifications, 'showMessage');

      // Act
      scope.showDepositPopup();

      // Assert
      expect(notifications.showMessage.withArgs({
        type : 'info',
        header: 'Deposit Limit',
        body : 'Limit the amount of money which you can deposit into your FootballINDEX account in a specific period of time.'
      }).calledOnce).to.equal(true);
    });

    // How to test this?
    it.skip('scope.$watch(\'depositLimit.value\') should work properly - HOW TO TEST THIS?', function() {
      // Arrange
      var returnObject = {
        depositLimitPeriod: 1,
        depositLimit: 10
      };
      httpBackend.whenGET(constant.API_URL + '/account/financialsettings').respond(returnObject);

      scope.depositLimit = {
        value: 'first'
      };

      scope.depositLimitPeriod = {
        value: ''
      };

      // Act
      rootScope.$apply(scope.depositLimit.value = 'second');

      // Assert
      expect(scope.depositLimitPeriod.value).to.equal(scope.depositLimit.value);
    })
  })
});