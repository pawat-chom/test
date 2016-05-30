define(function(require) {
  'use strict';

  var angular = require('angular');
  var accountmodule = require('app/modules/account/account');

  var rootScope, location;

  describe('Account module:', function() {
    beforeEach(module('ui.router', 'common.services.notifications', 'fame.account'));

    beforeEach(function() {
      inject(function($rootScope, $location) {
        rootScope = $rootScope;
        location = $location;
      })
    });

    it('should have a working /fame/account route', function() {
      location.path('/fame/account');
      rootScope.$digest();
      expect(location.path()).to.eq('/fame/account');
    });

    it('should have a working /fame/overview route', function() {
      location.path('/fame/overview');
      rootScope.$digest();
      expect(location.path()).to.eq('/fame/overview');
    });

    it('should have a working /fame/details route', function() {
      location.path('/fame/details');
      rootScope.$digest();
      expect(location.path()).to.eq('/fame/details');
    });

    it('should have a working /fame/change_password route', function() {
      location.path('/fame/change_password');
      rootScope.$digest();
      expect(location.path()).to.eq('/fame/change_password');
    });

    it('should have a working /fame/deposit_limits route', function() {
      location.path('/fame/deposit_limits');
      rootScope.$digest();
      expect(location.path()).to.eq('/fame/deposit_limits');
    });

    it('should have a working /fame/player_protection route', function() {
      location.path('/fame/player_protection');
      rootScope.$digest();
      expect(location.path()).to.eq('/fame/player_protection');
    });

    it('should have a working /fame/payments?success&error route', function() {
      location.path('/fame/payments?success&error');
      rootScope.$digest();
      expect(location.path()).to.eq('/fame/payments?success&error');
    });

    it('should have a working /fame/transaction_history route', function() {
      location.path('/fame/transaction_history');
      rootScope.$digest();
      expect(location.path()).to.eq('/fame/transaction_history');
    });
  })
});