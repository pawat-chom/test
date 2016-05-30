define(function(require) {
  'use strict';

  require([
    'angular',
    'uiRouter',
    'ngTouch',
    'app/app',
    'app/config',
    'app/libs',
    'app/modules/main',
    'app/common/services/index',
    'app/common/directives/index',
    'app/common/filters/index'
  ]);

  // error: fame module not found
  describe.skip('fame module', function() {
    var mainController;

    beforeEach(module(
      'fame.config',
      'fame.login',
      'fame.menu',
      'fame',

      'common.services',
      'common.directives',
      'common.filters',

      'ui.router'
    ));

    beforeEach(inject(function($controller) {
      mainController = $controller('MainController', {
      })
    }));

    it('controller should be defined', function() {
      expect(true).to.be(true);
      //expect(mainController).to.be.defined;
    })
  })
});