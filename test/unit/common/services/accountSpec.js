define(function (require) {
  'use strict';

  require([
    'angular',
    'app/common/services/account',
    'app/modules/portfolio/services/portfolio'
  ]);

  describe('account module: ', function () {
    var httpBackend, rootScope, storage, deferred,
      AccountService, profileFactory, cashBalanceFactory, portfolioService,
      END_POINT_TO_FREEPLAY, END_POINT_TO_PRODUCTION, FAME_CONSTANTS,
      params, returnObject;

    beforeEach(function () {
      module('common.services.account', 'fame.portfolio.portfolioService', 'ui.router');

      inject(function ($httpBackend, $rootScope, _storage_, $q,
                       _AccountService_, _profileFactory_, _cashBalanceFactory_, _portfolioService_,
                       _END_POINT_TO_FREEPLAY_, _END_POINT_TO_PRODUCTION_, _FAME_CONSTANTS_) {
        httpBackend = $httpBackend;
        rootScope = $rootScope;
        rootScope.user = {};
        storage = _storage_;
        deferred = $q.defer();

        AccountService = _AccountService_;
        profileFactory = _profileFactory_;
        cashBalanceFactory = _cashBalanceFactory_;
        portfolioService = _portfolioService_;

        END_POINT_TO_FREEPLAY = _END_POINT_TO_FREEPLAY_;
        END_POINT_TO_PRODUCTION = _END_POINT_TO_PRODUCTION_;
        FAME_CONSTANTS = _FAME_CONSTANTS_;
      })
    });

    afterEach(function () {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should be a valid service', function () {
      expect(AccountService).to.be.defined;
    });

    describe('create()', function () {
      beforeEach(function () {
        params = {};
        returnObject = {token: 'token'};

        sinon.spy(AccountService, 'loadAllUserInfo');
        sinon.spy(storage, 'set');
      });

      it('should set access token then call loadAllUserInfo() when create account succeeds', function () {
        // Arrange
        httpBackend.whenPOST(END_POINT_TO_FREEPLAY.API_URL + '/account/create_simple').respond(returnObject);
        httpBackend.whenGET(FAME_CONSTANTS.API_URL + '/account/profile').respond({});
        httpBackend.whenGET(FAME_CONSTANTS.API_URL + '/user').respond({});
        httpBackend.whenGET(FAME_CONSTANTS.API_URL + '/cashbalance').respond({});
        httpBackend.whenGET(FAME_CONSTANTS.API_URL + '/portfolio/totals').respond({});

        // Act
        AccountService.create(params);
        httpBackend.flush();

        // Assert
        expect(rootScope.user.accessToken).to.equal(returnObject.token);
        expect(storage.set.withArgs('access-token', returnObject.token).called).to.equal(true);
        expect(AccountService.loadAllUserInfo.called).to.equal(true);
      });

      it('should not set access token when create account fails', function () {
        // Arrange
        httpBackend.whenPOST(END_POINT_TO_FREEPLAY.API_URL + '/account/create_simple').respond(500);

        // Act
        AccountService.create(params);
        httpBackend.flush();

        // Assert
        expect(rootScope.user.accessToken).to.not.equal(returnObject.token);
        expect(storage.set.withArgs('access-token', returnObject.token).called).to.equal(false);
        expect(AccountService.loadAllUserInfo.called).to.equal(false);
      })
    });

    describe('open()', function () {
      beforeEach(function () {
        sinon.spy(AccountService, 'loadAllUserInfo');
        sinon.spy(storage, 'set');
      });

      it('should set access token then call loadAllUserInfo() when open account succeeds', function () {
        // Arrange
        returnObject = {token: 'token'};
        httpBackend.whenPOST(FAME_CONSTANTS.API_URL + '/account/open').respond(returnObject);
        httpBackend.whenGET(FAME_CONSTANTS.API_URL + '/account/profile').respond({});
        httpBackend.whenGET(FAME_CONSTANTS.API_URL + '/user').respond({});
        httpBackend.whenGET(FAME_CONSTANTS.API_URL + '/cashbalance').respond({});
        httpBackend.whenGET(FAME_CONSTANTS.API_URL + '/portfolio/totals').respond({});

        // Act
        AccountService.open(params);
        httpBackend.flush();

        // Assert
        expect(rootScope.user.accessToken).to.equal(returnObject.token);
        expect(storage.set.withArgs('access-token', returnObject.token).called).to.equal(true);
        //expect(rootScope.user.balance).to.equal(0);
        expect(AccountService.loadAllUserInfo.called).to.equal(true);
      });

      it('should not set access token when open account fails', function () {
        // Arrange
        httpBackend.whenPOST(FAME_CONSTANTS.API_URL + '/account/open').respond(500);

        // Act
        AccountService.open(params);
        httpBackend.flush();

        // Assert
        expect(rootScope.user.accessToken).to.not.equal(returnObject.token);
        expect(storage.set.withArgs('access-token', returnObject.token).called).to.equal(false);
        expect(AccountService.loadAllUserInfo.called).to.equal(false);
      });
    });

    describe('login()', function () {
      beforeEach(function () {
        sinon.spy(AccountService, 'loadAllUserInfo');
      });

      it('should set access token then call loadAllUserInfo() when login succeeds', function () {
        // Arrange
        returnObject = {token: 'token'};
        params = {remember_me: true};
        sinon.spy(storage, 'set');
        httpBackend.whenPOST(FAME_CONSTANTS.API_URL + '/login?getToken=yes').respond(returnObject);
        httpBackend.whenGET(FAME_CONSTANTS.API_URL + '/account/profile').respond({});
        httpBackend.whenGET(FAME_CONSTANTS.API_URL + '/user').respond({});
        httpBackend.whenGET(FAME_CONSTANTS.API_URL + '/cashbalance').respond({});
        httpBackend.whenGET(FAME_CONSTANTS.API_URL + '/portfolio/totals').respond({});

        // Act
        AccountService.login(params);
        httpBackend.flush();

        // Assert
        expect(rootScope.user.accessToken).to.equal(returnObject.token);
        expect(storage.set.withArgs('access-token', returnObject.token).called).to.equal(true);
        expect(storage.set.withArgs('remember_me', true).called).to.equal(true);
        expect(AccountService.loadAllUserInfo.called).to.equal(true);
      });

      it('should not set access token when login fails', function () {
        // Arrange
        sinon.spy(storage, 'remove');
        httpBackend.whenPOST(FAME_CONSTANTS.API_URL + '/login?getToken=yes').respond(500);

        // Act
        AccountService.login(params);
        httpBackend.flush();

        // Assert
        expect(rootScope.user.accessToken).to.equal(null);
        expect(storage.remove.withArgs('access-token').called).to.equal(true);
        expect(AccountService.loadAllUserInfo.called).to.equal(false);
      })
    });

    it('signOut() should clear rootScope.user and storage data', function () {
      // Arrange
      sinon.spy(storage, 'remove');

      // Act
      AccountService.signOut();

      // Assert
      expect(rootScope.user.balance).to.equal(0);
      expect(rootScope.user.profile).to.deep.equal({});
      expect(rootScope.user.accessToken).to.equal(0);
      expect(storage.remove.withArgs('user-balance').called).to.equal(true);
      expect(storage.remove.withArgs('access-token').called).to.equal(true);
      expect(storage.remove.withArgs('user-profile').called).to.equal(true);
      expect(storage.remove.withArgs('remember_me').called).to.equal(true);
    });

    it('changePassword() should call the correct API', function () {
      // Arrange
      var oldPassword = 'old', newPassword = 'new', returnObject = 'data';
      httpBackend.expectPOST(FAME_CONSTANTS.API_URL + '/account/setpassword').respond(returnObject);

      // Act
      var result;
      AccountService.changePassword(oldPassword, newPassword).then(function(response) {
        result = response;
      });
      httpBackend.flush();

      // Assert
      expect(result).to.not.equal(null);
      expect(result).to.equal(returnObject);
    });

    describe('loadAllUserInfo()', function () {
      beforeEach(function() {
        sinon.spy(profileFactory, 'getProfile');
        sinon.spy(profileFactory, 'getUserInfo');
        sinon.spy(cashBalanceFactory, 'getBalance');
        sinon.spy(portfolioService, 'getPortfolioTotals');
        sinon.spy(storage, 'set');
      });

      it('should set user data when API calls succeed', function () {
        // Arrange
        var returnObjects = {
          getProfile: {data: 'getProfile'},
          getUserInfo: {data: 'getUserInfo'},
          getBalance: {cash: 'getBalance'},
          getPortfolioTotals: {data: 'getPortfolioTotals'}
        };
        httpBackend.whenGET(FAME_CONSTANTS.API_URL + '/account/profile').respond(returnObjects.getProfile);
        httpBackend.whenGET(FAME_CONSTANTS.API_URL + '/user').respond(returnObjects.getUserInfo);
        httpBackend.whenGET(FAME_CONSTANTS.API_URL + '/cashbalance').respond(returnObjects.getBalance);
        httpBackend.whenGET(FAME_CONSTANTS.API_URL + '/portfolio/totals').respond(returnObjects.getPortfolioTotals);

        // Act
        AccountService.loadAllUserInfo();
        httpBackend.flush();

        // Assert
        expect(profileFactory.getProfile.calledOnce).to.equal(true);
        expect(rootScope.user.profile).to.deep.equal(returnObjects.getProfile);
        expect(storage.set.withArgs('user-profile', returnObjects.getProfile).called).to.equal(true);

        expect(profileFactory.getUserInfo.calledOnce).to.equal(true);
        expect(rootScope.user.info).to.deep.equal(returnObjects.getUserInfo);
        expect(storage.set.withArgs('user-info', returnObjects.getUserInfo).called).to.equal(true);

        expect(cashBalanceFactory.getBalance.calledOnce).to.equal(true);
        expect(rootScope.user.balance).to.deep.equal(returnObjects.getBalance.cash);

        expect(portfolioService.getPortfolioTotals.calledOnce).to.equal(true);
        expect(rootScope.portfolio.totals).to.deep.equal(returnObjects.getPortfolioTotals);
      });

      it('should set user balance to 0 when API calls fail', function () {
        // Arrange
        rootScope.user.balance = 10;
        var spy = sinon.spy(deferred, 'reject');
        httpBackend.whenGET(FAME_CONSTANTS.API_URL + '/account/profile').respond(500);
        httpBackend.whenGET(FAME_CONSTANTS.API_URL + '/user').respond(500);
        httpBackend.whenGET(FAME_CONSTANTS.API_URL + '/cashbalance').respond(500);
        httpBackend.whenGET(FAME_CONSTANTS.API_URL + '/portfolio/totals').respond(500);

        // Act
        AccountService.loadAllUserInfo(deferred);
        httpBackend.flush();

        // Assert
        expect(profileFactory.getProfile.calledOnce).to.equal(true);
        expect(profileFactory.getUserInfo.calledOnce).to.equal(true);
        expect(cashBalanceFactory.getBalance.calledOnce).to.equal(true);
        expect(rootScope.user.balance).to.equal(0);
        expect(portfolioService.getPortfolioTotals.calledOnce).to.equal(true);
        expect(deferred.reject.calledThrice).to.equal(true);
      })
    });

    it('setFields() should call the correct API', function() {
      // Arrange
      var fields = ['field1', 'field2'];
      httpBackend.expectPUT(FAME_CONSTANTS.API_URL + '/account/profile/field').respond('');

      // Act
      AccountService.setFields(fields);
      httpBackend.flush();

      // Assert
    });

    it('recovery() should return result from API call', function() {
      // Arrange
      var email = 'email', returnObject = 'data';
      httpBackend.expectPOST(FAME_CONSTANTS.API_URL + '/account/recovery').respond(returnObject);

      // Act
      var result;
      AccountService.recovery(email).then(function(response) {
        result = response.data;
      });
      httpBackend.flush();

      // Assert
      expect(result).to.not.equal(null);
      expect(result).to.equal(returnObject);
    });

    it('checkResetPasswordHash() should return result from API call', function() {
      // Arrange
      var hash = 'hash', returnObject = 'data';
      httpBackend.expectGET(FAME_CONSTANTS.API_URL + '/account/resetpassword/' + hash).respond(returnObject);

      // Act
      var result;
      AccountService.checkResetPasswordHash(hash).then(function(response) {
        result = response.data;
      });
      httpBackend.flush();

      // Assert
      expect(result).to.not.equal(null);
      expect(result).to.equal(returnObject);
    });

    it('resetPassword() should return result from API call', function() {
      // Arrange
      var hash = 'hash', returnObject = 'data';
      httpBackend.expectPOST(FAME_CONSTANTS.API_URL + '/account/resetpassword/' + hash).respond(returnObject);

      // Act
      var result;
      AccountService.resetPassword(hash).then(function(response) {
        result = response.data;
      });
      httpBackend.flush();

      // Assert
      expect(result).to.not.equal(null);
      expect(result).to.equal(returnObject);
    });
  })
});