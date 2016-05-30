define(function(require) {
  'use strict';

  require([
    'angular'
  ]);

  var rootScope, location;

  describe('Reset password module:', function() {
    beforeEach(module('ui.router', 'common.services.notifications', 'resetPassword'));

    beforeEach(function() {
      inject(function($rootScope, $location) {
        rootScope = $rootScope;
        location = $location;
      })
    });

    it('should have a working /fame/account route', function() {
      location.path('/account/resetpassword/:hash');
      rootScope.$digest();
      expect(location.path()).to.eq('/account/resetpassword/:hash');
    });
  })
});