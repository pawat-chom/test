
define(function(require) {
  'use strict';

  var angular = require('angular');
  var loginmodule = require('app/modules/login/login');
  var logincontroll, ctrl, scope,AccountService;

  describe.skip('login Module', function() {

  		beforeEach(module('common.services.account'));
	    beforeEach(module('fame.login'));

	    beforeEach(inject(function($rootScope, $controller,_AccountService_) {
	    	var AccountService = _AccountService_;
	        var scope = $rootScope.$new();
	        ctrl = $controller('logincontrol', {$scope: scope, AccountService: AccountService});
	      })
	    );

	    it('should be a valid controller', function() {
	      expect(ctrl).to.be.an('object');
	    });


  });

});

