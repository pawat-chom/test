/*
define(function(require) {
  'use strict';
  var angular = require('angular'),
    //ionicAngular = require('ionicAngular'),
    ajaxLoadingModule = require('app/common/services/ajaxLoading'),
    _ajaxLoadingFactory, $ionicLoading;

  describe('Ajax loading service', function() {
    beforeEach(module('common.services.ajaxloading'));

    beforeEach(function() {
      inject(function(ajaxLoading, _$ionicLoading_) {
        _ajaxLoadingFactory = ajaxLoading;
        $ionicLoading = _$ionicLoading_;
      });
    });

    it('should be a valid service', function() {
      expect(_ajaxLoadingFactory).to.be.an('object');
    });

    it('should be a valid method', function() {
      expect(_ajaxLoadingFactory.show).to.be.an('function');
    });

    describe('show method', function() {
      it('call $ionicLoading.show method', function() {
        var spy = sinon.spy($ionicLoading, 'show');
        _ajaxLoadingFactory.show(true);
        expect(spy).called;
      });

      it('call $ionicLoading.hide method', function() {
        var spy = sinon.spy($ionicLoading, 'hide');
        _ajaxLoadingFactory.show(false);
        expect(spy).called;
      });
    });
  });
});
*/