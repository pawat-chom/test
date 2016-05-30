/*
define(function(require) {
  'use strict';
  var angular = require('angular'),
    modalModule = require('app/common/services/modal'),
    modalFactory, $ionicModal;

  describe('modal service', function() {
    beforeEach(module('common.services.modal'));

    beforeEach(function() {
      inject(function(_modalFactory_, _$ionicModal_) {
        modalFactory = _modalFactory_;
        $ionicModal = _$ionicModal_;
      });
    });

    it('should be a valid service', function() {
      expect(modalFactory).to.be.an('object');
    });

    it('should has the showModal method', function() {
      expect(modalFactory.showModal).to.be.an('function');
    });

    describe('showModal method', function() {
      it('should valid', function() {
        var cb = function(mdl, scp) {

        };
        var spy = sinon.spy($ionicModal, 'fromTemplate');
        var cbCall = sinon.spy(cb, 'call');
        modalFactory.showModal('test', cb);
        expect(spy).called;
        expect(cbCall).called;
      });
    })
  });
});
*/