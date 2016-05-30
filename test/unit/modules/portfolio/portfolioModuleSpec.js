define(function(require) {
  'use strict';

  var angular = require('angular');
  var portfoliomodule = require('app/modules/portfolio/portfolio');
  var location,rootScope;

  describe('PortFolio Route Module', function() {

    beforeEach(module('fame.portfolio'));
    beforeEach(module('common.services.notifications'));

    beforeEach(function() {
      inject(function($rootScope,$location) {
         location = $location;
         rootScope = $rootScope;
      });
    });

    it('should have a working /fame/portfolio route', function(){

      location.path('/fame/portfolio');
      rootScope.$digest();
      expect(location.path()).to.eq('/fame/portfolio');
    });

  });

});