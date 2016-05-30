define(function(require) {
  'use strict';

  var angular = require('angular');
  var accountmodule = require('app/modules/account/account');
  var portfoliomodule = require('app/modules/portfolio/portfolio');

  var player_protectionController, scope, state, httpBackend, constant,
    AccountService, notifications, financialService;

  describe('player_protection controller', function() {
    beforeEach(module('ui.router',
      'common.services.notifications', 'common.services.account',
      'fame.portfolio', 'fame.account'));

    beforeEach(inject(function($controller, $rootScope, $state, $httpBackend,
                               _AccountService_, _notifications_, _financialService_, _FAME_CONSTANTS_) {
      scope = $rootScope.$new();
      state = $state;
      state.current = { name: 'state' };
      httpBackend = $httpBackend;

      AccountService = _AccountService_;
      notifications = _notifications_;
      financialService = _financialService_;
      constant = _FAME_CONSTANTS_;

      player_protectionController = $controller('player_protectionController', {
        $scope: scope,
        AccountService: AccountService,
        notifications: notifications,
        financialService: financialService
      });
    }));

    it('should be a valid controller', function () {
      expect(player_protectionController).to.be.defined;
    });

    it('default values should be set', function() {
      expect(scope.userPassword).to.equal('');
      expect(scope.monthsCount.toString()).to.equal("6");
      expect(scope.stateName).to.equal(state.current.name);
    });

    // how to test showMessage callback?
    it('saveProtection should work properly', function() {
      // Arrange
      var userPassword = 'password',
        monthsCount = 1;
      sinon.spy(notifications, 'showMessage');
      sinon.spy(financialService, 'selfExclude');

      // Act
      scope.saveProtection(userPassword, monthsCount);

      // Assert
      expect(notifications.showMessage.called).to.equal(true);
    });
  })
});