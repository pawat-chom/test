define(function (require) {
  'use strict';

  require([
    'angular',
    'app/modules/feed/feed'
  ]);

  var rootScope, location;

  describe('Feed module:', function () {
    beforeEach(module('ui.router', 'common.services.notifications', 'fame.feed'));

    beforeEach(function () {
      inject(function ($rootScope, $location) {
        rootScope = $rootScope;
        location = $location;
      });
    });

    it('should have a working /fame/feed route', function () {
      location.path('/fame/feed');
      rootScope.$digest();
      expect(location.path()).to.eq('/fame/feed');
    });
  });
});