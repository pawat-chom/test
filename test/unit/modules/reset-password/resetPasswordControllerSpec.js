define(function () {
  'use strict';

  require([
    'angular',
    'app/modules/login/login',
    'app/modules/reset-password/reset-password',
    'app/common/services/account'
  ]);

  var resetPasswordController, scope, accountService, httpBackend, constant, notifications, stateProvider, state;

  describe('resetPassword controller:', function () {
    beforeEach(function() {
      module('ui.router', 'ui.router', 'common.services.account', 'resetPassword', function($stateProvider) {
        stateProvider = $stateProvider;
        stateProvider.state('login', {url: '/account/login'});
      });

      inject(function ($controller, $q, $httpBackend, $state, _AccountService_, _FAME_CONSTANTS_, _notifications_) {
        scope = {
          showLoading: function () {
          }
        };
        accountService = _AccountService_;
        notifications = _notifications_;
        constant = _FAME_CONSTANTS_;

        state = $state;
        httpBackend = $httpBackend;

        resetPasswordController = $controller('resetPasswordController', {
          $scope: scope,
          accountService: accountService
        })
      });
    });


    it('should be a valid controller', function () {
      expect(resetPasswordController).to.be.defined;
    });

    it('default values should be set', function () {
      // Assert
      expect(scope.resetData).to.deep.equal({});
      expect(scope.dataLoaded).to.deep.equal(false);
    });

    it('checkResetPasswordHash should work properly', function () {
      // Arrange
      httpBackend.whenGET(constant.API_URL + '/account/resetpassword/undefined').respond([]);
      sinon.spy(accountService, 'checkResetPasswordHash');

      // Act
      scope.checkResetPasswordHash();
      httpBackend.flush();

      // Assert
      expect(accountService.checkResetPasswordHash.calledOnce).to.true;
      expect(scope.dataLoaded).to.equal(true);
    });

    it('resetPassword should work properly', function () {
      // Arrange
      httpBackend.whenPOST(constant.API_URL + '/account/resetpassword/undefined').respond([]);
      sinon.spy(accountService, 'resetPassword');
      sinon.spy(notifications, 'showMessage');

      // Act
      scope.resetPassword();
      httpBackend.flush();

      // Assert
      expect(accountService.resetPassword.calledOnce).to.equal(true);
      expect(notifications.showMessage.withArgs({
        type: 'info',
        header: 'Success',
        body: "Your password has been changed"
      }).calledOnce).to.equal(true);
      expect(state.current.name).to.equal('login');
    });
  })
});