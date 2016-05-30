define(function(require) {
  'use strict';

  require([
    'angular',
    'app/common/services/notifications',
    'app/modules/docs/docs'
  ]);

  var rootScope, location;

  describe('Docs module:', function() {
    beforeEach(module('ui.router', 'common.services.notifications', 'fame.docs'));

    beforeEach(function() {
      inject(function($rootScope, $location) {
        rootScope = $rootScope;
        location = $location;
      })
    });

    it('should have a working /docs/:filename route', function() {
      location.path('/docs/:filename');
      rootScope.$digest();
      expect(location.path()).to.eq('/docs/:filename');
    });
  })
});