define(function (require) {
  'use strict';

  require([
    'angular',
    'app/common/services/notifications',
    'app/modules/docs/docs'
  ]);

  var docsController, rootScope, scope, stateParams, httpBackend, sce, stateProvider, state,
    notifications, policiesService, constant,
    states = {
      previousState: 'previousState',
      list: 'list',
      team: 'list.team',
      login: 'login'
    };

  describe('Docs controller:', function () {
    beforeEach(function() {
      module('ui.router', function($stateProvider) {
        stateProvider = $stateProvider;
        stateProvider.state(states.list, {url: states.list});
        stateProvider.state(states.team, {url: states.team});
        stateProvider.state(states.previousState, {url: states.previousState});
        stateProvider.state(states.login, {url: states.login});
      });
    });

    beforeEach(module('common.services.notifications', 'common.services.policies', 'fame.docs'));

    beforeEach(inject(function ($rootScope, $controller, $stateParams, $httpBackend, $sce, $state,
                                _policiesService_, _notifications_, _FAME_CONSTANTS_) {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        stateParams = $stateParams;
        stateParams.filename = 'filename';
        httpBackend = $httpBackend;
        sce = $sce;

        policiesService = _policiesService_;
        notifications = _notifications_;
        constant = _FAME_CONSTANTS_;
        state = $state;

        docsController = $controller('docsController', {
          $scope: scope
        });
      })
    );

    it('should be a valid controller', function () {
      expect(docsController).to.be.defined;
    });

    it('default values should be set', function() {
      expect(scope.content).to.equal(false);
    });

    it('scope.content should be set when policiesService.getFile returns', function() {
      // Arrange
      sinon.spy(policiesService, 'getFile');
      var returnObject = { result: 'result' };
      httpBackend.whenGET(constant.API_URL + '/policies/' + stateParams.filename).respond(returnObject);

      // Act
      httpBackend.flush();

      // Assert
      expect(scope.content.toString()).to.equal(sce.trustAsHtml(returnObject.result).toString())
    });

    it('closePage should transition to rootScope.previousState if it\'s truthy', function() {
      // Arrange
      rootScope.previousState = 'previousState';
      var returnObject = { result: 'result' };
      httpBackend.whenGET(constant.API_URL + '/policies/' + stateParams.filename).respond(returnObject);

      // Act
      scope.closePage();
      scope.$apply();

      // Assert

      expect(state.current.name).to.equal(states.previousState);
    });

    it('closePage should transition to login if rootScope.previousState is false', function() {
      // Arrange
      var returnObject = { result: 'result' };
      httpBackend.whenGET(constant.API_URL + '/policies/' + stateParams.filename).respond(returnObject);

      // Act
      scope.closePage();
      scope.$apply();

      // Assert

      console.log('============================================================== state.current.name ' + state.current.name);
      expect(state.current.name).to.equal(states.login);
    })
  });
});

