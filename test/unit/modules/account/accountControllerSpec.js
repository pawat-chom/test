define(function (require) {
  'use strict';

    var angular = require('angular');
    var accountmodule = require('app/modules/account/account');

  var accountController, rootScope, scope, state, location, notifications;

  describe('Account controller:', function () {

    beforeEach(module('ui.router', 'common.services.notifications', 'fame.account'));

    beforeEach(inject(function ($rootScope, $controller, $state, $location, _notifications_) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        state = $state;
        state.current = {
          name: 'state'
        };
        location = $location;
        notifications = _notifications_;

        accountController = $controller('accountController', {
          $scope: scope
        });
      })
    );

    it('should be a valid controller', function () {
      expect(accountController).to.be.defined;
    });

    it('default values should be set', function () {
      expect(scope.dataLoaded).to.equal(true);
      expect(scope.stateName).to.equal('state');
    });

    it('isAccountPageActive should work properly', function() {
      // Arrange

      // Act
      scope.isAccountPageActive();

      // Assert
      expect(state.current.name).to.equal('state');
    });

    it('moveTap should work properly', function() {
      // Arrange
      var tap = 'tap', path = '/path';
      sinon.spy(notifications, 'updateAccountTap');

      // Act
      scope.moveTap(tap, path);

      // Assert
      expect(location.url()).to.equal(path);
      expect(notifications.updateAccountTap.calledOnce).to.equal(true);
    })
  });
});

