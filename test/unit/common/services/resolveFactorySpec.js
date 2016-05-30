define(function (require) {
  'use strict';

  require('app/common/services/resolveFactory');

  var rootScope, location, resolveFactory;

  describe('Profile service', function () {
    beforeEach(function () {
      module('common.services.resolveFactory', 'ui.router');

      inject(function ($rootScope, $location, _resolveFactory_) {
        rootScope = $rootScope;
        location = $location;
        resolveFactory = _resolveFactory_;
      });
    });

    it('should be a valid service', function () {
      expect(resolveFactory).to.not.equal(null);
    });

    it('needUserLoggedIn should redirects to login if there is no access token', function() {
      // Arrange
      rootScope.user = {};
      sinon.spy(location, 'path');

      // Act
      resolveFactory.needUserLoggedIn();

      // Assert
      expect(location.path.withArgs('/account/login').called).to.equal(true);
    })
  });
});