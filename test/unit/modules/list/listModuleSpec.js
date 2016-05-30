
define(function(require) {
  'use strict';

  var angular = require('angular');
  var listmodule = require('app/modules/list/list');
  var location,rootScope;

  describe('List Module', function() {

    //beforeEach(module('fame.list'));

    beforeEach(function() {
      inject(function($rootScope,$location) {
         location = $location;
         rootScope = $rootScope;
      });
    });

    it('should have a working /fame/list/team route', function(){

      location.path('/fame/list/team');
      rootScope.$digest();
      expect(location.path()).to.eq('/fame/list/team');
    });

    it('should have a working /fame/list/squad route', function(){

      location.path('/fame/list/squad');
      rootScope.$digest();
      expect(location.path()).to.eq('/fame/list/squad');
    });

    it('should have a working /fame/list/buzz route', function(){

      location.path('/fame/list/buzz');
      rootScope.$digest();
      expect(location.path()).to.eq('/fame/list/buzz');
    });

    it('should have a working /fame/feed route', function(){

      location.path('/fame/feed');
      rootScope.$digest();
      expect(location.path()).to.eq('/fame/feed');
    });

    it('should have a working /fame/portfolio route', function(){

      location.path('/fame/portfolio');
      rootScope.$digest();
      expect(location.path()).to.eq('/fame/portfolio');
    });


  });

});

