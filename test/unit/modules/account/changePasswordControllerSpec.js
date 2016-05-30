define(function (require) {
  'use strict';

  require([
    'angular',
    'app/modules/account/account',
    'app/common/services/account'
  ]);

  var changePasswordController, scope, rootScope, AccountService, notifications,
    httpBackend, constants;

  describe('Change password controller:', function () {

    beforeEach(module('ui.router', 'common.services.notifications', 'common.services.account', 'fame.account'));

    beforeEach(inject(function ($rootScope, $controller, _AccountService_, _notifications_, $httpBackend, _FAME_CONSTANTS_) {
        rootScope = $rootScope;
        scope = {
          showLoading: function() {}
        };
        AccountService = _AccountService_;
        notifications = _notifications_;
        httpBackend = $httpBackend;
        constants = _FAME_CONSTANTS_;

        changePasswordController = $controller('change_passwordController', {
          $scope: scope,
          AccountService: AccountService,
          notifications: notifications
        });
      })
    );

    it('should be a valid controller', function () {
      expect(changePasswordController).to.be.defined;
    });

    it.skip('save() should change password when confirmNewPassword = newPassword', function () {
      // Arrange
      var currentPassword = 'current',
        newPassword = 'new',
        confirmNewPassword = newPassword;

      sinon.spy(AccountService, 'changePassword');
      sinon.spy(notifications, 'showMessage');

      httpBackend.whenPOST(constants.API_URL + '/account/setpassword').respond([]);

      // Act
      scope.save(currentPassword, newPassword, confirmNewPassword);
      rootScope.$digest();
      httpBackend.flush();

      // Assert
      expect(AccountService.changePassword.calledOnce).to.equal(true);
      expect(notifications.showMessage.withArgs({
        type : 'info',
        header: 'Success',
        body : 'Your password has been changed.'
      }).calledOnce).to.equal(true);
    });

    it('save() should not change password when confirmNewPassword != newPassword', function () {
      // Arrange
      var currentPassword = 'current',
        newPassword = 'new',
        confirmNewPassword = newPassword + '123';

      sinon.spy(AccountService, 'changePassword');
      sinon.spy(notifications, 'showMessage');

      // Act
      scope.save(currentPassword, newPassword, confirmNewPassword);

      // Assert
      expect(notifications.showMessage.withArgs({
        type : 'error',
        header: 'Error',
        body : 'Password and password confirmation does not match.'
      }).calledOnce).to.equal(true);
    });

    it('save() should show error from server', function () {
      // Arrange
      var currentPassword = 'current',
        newPassword = 'new',
        confirmNewPassword = newPassword;

      sinon.spy(AccountService, 'changePassword');
      sinon.spy(notifications, 'showMessage');

      var returnObject = { error: 'INVALID PASSWORD' };
      httpBackend.whenPOST(constants.API_URL + '/account/setpassword').respond(returnObject);

      // Act
      scope.save(currentPassword, newPassword, confirmNewPassword);
      rootScope.$digest();
      httpBackend.flush();

      // Assert
      expect(AccountService.changePassword.calledOnce).to.equal(true);
      expect(notifications.showMessage.withArgs({
        type : 'error',
        header: 'error',
        body : 'The password you entered is not valid. Please try again.'
      }).calledOnce).to.equal(true);
    });
  });
});

