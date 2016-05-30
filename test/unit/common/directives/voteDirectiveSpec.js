
define(function(require) {
  'use strict';

  var angular = require('angular');
  var feedModule = require('app/common/directives/voteButton/voteButton');
  var scope,element,controller,constant,httpBackend,compile,rootScope;
  var template,agent,notifications;

  describe('feed Directive', function() {

    beforeEach(module('common.services.notifications'));
    beforeEach(module('common.services.vote'));
    beforeEach(module('common.services.feed'));
    beforeEach(module('common.directives.feed'));
  	beforeEach(module('common.services.notifications'));
	  beforeEach(module('common.directives.voteButton'));

    beforeEach(inject(function($httpBackend,_FAME_CONSTANTS_) {
        constant = _FAME_CONSTANTS_;
        httpBackend = $httpBackend;
    }));

    beforeEach(inject(function(_notifications_) {
      notifications = _notifications_;
    }));

    beforeEach(function() {
      inject(function(_$compile_, _$rootScope_) {
        compile = _$compile_;
        rootScope = _$rootScope_;
        scope = rootScope.$new();
      });
    });

    it.skip(':Vote should work', function() {

      element = angular.element('<vote-button vote-id="javier-manquillo"></vote-button>');
      template = compile(element)(scope);
      controller = element.controller('vote-button');

      scope = element.isolateScope()
      scope.$digest();

      agent = sinon.spy(scope,'vote');
      scope.id = 'javier-manquillo';
      controller.vote('up');
      expect(agent.calledOnce).to.equal(true);
    });


  });

});