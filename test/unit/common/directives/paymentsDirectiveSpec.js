define(function (require) {
  'use strict';

  var angular = require('angular');
 // var indexService = require('app/common/services/index');
  var notificationsService = require('app/common/services/notifications');
  var policiesService = require('app/common/services/policies');
  var profileService = require('app/common/services/profile');
  var cashbalanceService = require('app/common/services/cashbalance');
  var menumodule = require('app/modules/menu/menu');
  var accountmodule = require('app/modules/account/account');

  var paymentsController, rootScope, scope, stateParams, httpBackend, constant, location, storage,
    notifications, AccountService, cashBalanceFactory, financialService, profileFactory, policiesService;

  describe('payment Directive:', function () {

    //todo: fix this tests
    return;

    beforeEach(module('ui.router', 'common.services.notifications',
      'common.services.policies', 'common.services.profile', 'common.services.cashbalance',
      'common.services.account', 'fame.account', 'fame.menu'));

    beforeEach(inject(function (_$rootScope_, $controller, $stateParams, $httpBackend, _FAME_CONSTANTS_, $location,
                                _notifications_, _AccountService_, _financialService_, _cashBalanceFactory_,
                                _profileFactory_, _policiesService_, _storage_) {

      rootScope = _$rootScope_;
      scope = rootScope.$new();
      scope.showLoading = function () {
      };
      rootScope.user = {info: {id: 1}};
      stateParams = $stateParams;
      httpBackend = $httpBackend;
      constant = _FAME_CONSTANTS_;
      location = $location;

      notifications = _notifications_;
      AccountService = _AccountService_;
      cashBalanceFactory = _cashBalanceFactory_;
      financialService = _financialService_;
      profileFactory = _profileFactory_;
      policiesService = _policiesService_;
      storage = _storage_;

      paymentsController = $controller('paymentsController', {
        $scope: scope,
        $rootScope: rootScope,
        profileFactory: profileFactory,
        financialService: financialService,
        cashBalanceFactory: cashBalanceFactory,
        AccountService: AccountService,
        $stateParams: stateParams
      });
    }));

    it('should be a valid controller', function () {
      expect(paymentsController).to.be.defined;
    });

    // how to test code block in $stateParams.success === "1"
    describe.skip('when stateParams.success = "1"', function () {
      beforeEach(inject(function ($stateParams, $controller, $httpBackend, _notifications_, _cashBalanceFactory_) {
        stateParams = $stateParams;
        stateParams.success = "1";
        httpBackend = $httpBackend;
        notifications = _notifications_;
        cashBalanceFactory =  _cashBalanceFactory_;

        $controller('paymentsController', {
          $scope: scope,
          $stateParams: stateParams,
          notifications: notifications,
          cashBalanceFactory: cashBalanceFactory
        });
      }));

      it('functions should run', function () {
        // Arrange
        sinon.spy(notifications, 'showMessage');
        sinon.spy(cashBalanceFactory, 'getBalance');
        var returnObject = { cash: 'cash' };
        httpBackend.whenGET(constant.API_URL + '/cashbalance').respond(returnObject);

        // Act
        scope.$apply();
        httpBackend.flush();

        // Assert
        expect(notifications.showMessage.called).to.equal(true);
        expect(notifications.showMessage.withArgs({
          type : 'info',
          header: 'Success',
          body : 'Your payment is successful finished.'
        }).called).to.equal(true);
        expect(cashBalanceFactory.getBalance.called).to.equal(true);
        expect(rootScope.user.balance).to.equal(returnObject.cash);
      });

      afterEach(function () {
        stateParams.success = undefined;
      });
    });

    it('default values should be set', function () {
      console.log(scope);

      expect(scope.paymentTag).to.equal(constant.PAYMENT_TAG);
      expect(scope.viewTab).to.equal('Deposit');
      expect(scope.hash).to.equal('');
      expect(scope.loadingState).to.equal(false);
      expect(scope.hasLastTransaction).to.equal(null);
      expect(scope.lastForm).to.deep.equal({useLastPayment: true});
      expect(scope.paymentMethod).to.deep.equal({value: ''});
      expect(scope.loadedAcknowledge).to.equal(false);
      expect(scope.widthrawForm).to.deep.equal({});
      expect(scope.acknowledgeChecked).to.deep.equal({value: false});
      expect(scope.enrolled.paReq).to.equal('');
      expect(scope.enrolled.md).to.equal('');
      expect(scope.enrolled.termUrl).to.contain(constant.API_URL + '/secure/auth/enrolled?redirectSuccess=');
    });

    it('setPaymentMethod should work properly', function () {
      // Arrange
      var method = 'method';

      // Act
      scope.setPaymentMethod(method);

      // Assert
      expect(scope.paymentMethod.value).to.equal(method);
      expect(scope.lastForm.useLastPayment).to.equal(false);
    });

    it('changeLast should workd properly', function () {
      // Arrange
      scope.lastForm = {
        useLastPayment: ''
      };

      // Act
      scope.changeLast();

      // Assert
      expect(scope.paymentMethod.value).to.equal('');
    });

    it('trustSrc should work properly', function () {
      // Arrange
      var src = 'src';

      // Act
      var result = scope.trustSrc(src);

      // Assert
      expect(result).to.be.defined;
    });

    describe('payDeposit method: ', function () {
      it('should return error message when $scope.acknowledgeChecked.value is truthy', function () {
        // Arrange
        sinon.spy(notifications, 'showMessage');

        // Act
        scope.payDeposit();

        // Assert
        expect(notifications.showMessage.withArgs({
          type: 'error',
          header: 'Warning',
          body: 'Please tick the box to acknowledge that you understand how your funds are held'
        }).called).to.equal(true);
      });

      it('should set data when $scope.acknowledgeChecked.value is falsy and return error message', function () {
        // Arrange
        var amount = 1;
        scope.acknowledgeChecked = {
          value: 'value'
        };
        sinon.spy(AccountService, 'setFields');
        sinon.spy(notifications, 'showMessage');

        httpBackend.whenPUT(constant.API_URL + '/account/profile/field').respond('data');
        httpBackend.whenPOST(constant.API_URL + '/secure/deposit').respond('data');

        scope.paymentMethod.value = scope.lastForm.useLastPayment = undefined;

        // Act
        scope.payDeposit(amount);
        scope.$digest();

        // Assert
        expect(AccountService.setFields.called).to.equal(true);
        expect(notifications.showMessage.withArgs({
          type: 'error',
          header: 'Error',
          body: 'Choose card type, please'
        }).called).to.equal(true);
      });

      it('should set data when $scope.acknowledgeChecked.value is falsy and return error message', function () {
        // Arrange
        var amount = 1;
        scope.acknowledgeChecked = {
          value: 'value'
        };
        sinon.spy(AccountService, 'setFields');
        sinon.spy(notifications, 'showMessage');

        httpBackend.whenPUT(constant.API_URL + '/account/profile/field').respond('data');
        httpBackend.whenPOST(constant.API_URL + '/secure/deposit').respond('data');

        // Act
        scope.payDeposit(amount);
        scope.$digest();

        // Assert
        expect(AccountService.setFields.called).to.equal(true);
        expect(notifications.showMessage.withArgs({
          type: 'error',
          header: 'Error',
          body: 'Minimum amount of &pound;10'
        }).called).to.equal(true);
      });

      it('should set data when $scope.acknowledgeChecked.value is falsy', function () {
        // Arrange
        var amount = 11;
        scope.acknowledgeChecked = {
          value: 'value'
        };
        sinon.spy(AccountService, 'setFields');
        sinon.spy(notifications, 'showMessage');
        sinon.spy(financialService, 'putDeposit');

        var returnObject = {
          hash: 'hash',
          submitFirstDeposit: 'submitFirstDeposit',
          sitereference: 'sitereference',
          settleduedate: 'settleduedate'
        };
        httpBackend.whenPUT(constant.API_URL + '/account/profile/field').respond([]);
        httpBackend.whenPOST(constant.API_URL + '/secure/deposit').respond(returnObject);
        httpBackend.whenGET(constant.API_URL + '/user').respond([]);

        // Act
        scope.payDeposit(amount);
        scope.$digest();
        httpBackend.flush();

        // Assert
        expect(AccountService.setFields.called).to.equal(true);
        //expect(scope.loadingState).to.equal(true);
        expect(financialService.putDeposit.called).to.equal(true);
        expect(scope.hash).to.equal(returnObject.hash);
        expect(scope.sitereference).equal(returnObject.sitereference);
        expect(scope.settleduedate).equal(returnObject.settleduedate);
      });

      it('should set data when $scope.acknowledgeChecked.value is falsy', function () {
        // Arrange
        var amount = 11;
        scope.acknowledgeChecked = {
          value: 'value'
        };
        sinon.spy(AccountService, 'setFields');
        sinon.spy(notifications, 'showMessage');
        sinon.spy(financialService, 'putDeposit');

        var returnObject = {
          hash: 'hash',
          submitEnrolled: 'submitEnrolled',
          pareq: 'pareq',
          md: 'md',
          acsurl: 'acsurl'
        };
        httpBackend.whenPUT(constant.API_URL + '/account/profile/field').respond([]);
        httpBackend.whenPOST(constant.API_URL + '/secure/deposit').respond(returnObject);
        httpBackend.whenGET(constant.API_URL + '/user').respond([]);

        // Act
        scope.payDeposit(amount);
        scope.$digest();
        httpBackend.flush();

        // Assert
        expect(AccountService.setFields.called).to.equal(true);
        expect(financialService.putDeposit.called).to.equal(true);
        expect(scope.hash).to.equal(returnObject.hash);
        expect(scope.enrolled.paReq).to.equal(returnObject.pareq);
        expect(scope.enrolled.md).to.equal(returnObject.md);
        expect(scope.acsurl).to.equal(returnObject.acsurl);
      });

      it('should set data when $scope.acknowledgeChecked.value is falsy and show error message', function () {
        // Arrange
        var amount = 11;
        scope.acknowledgeChecked = {
          value: 'value'
        };
        sinon.spy(AccountService, 'setFields');
        sinon.spy(notifications, 'showMessage');
        sinon.spy(financialService, 'putDeposit');

        var returnObject = {
          hash: 'hash',
          success: 'success'
        };
        httpBackend.whenPUT(constant.API_URL + '/account/profile/field').respond([]);
        httpBackend.whenPOST(constant.API_URL + '/secure/deposit').respond(returnObject);
        httpBackend.whenGET(constant.API_URL + '/user').respond([]);

        // Act
        scope.payDeposit(amount);
        scope.$digest();
        httpBackend.flush();

        // Assert
        expect(AccountService.setFields.called).to.equal(true);
        expect(financialService.putDeposit.called).to.equal(true);
        expect(scope.hash).to.equal(returnObject.hash);
        expect(notifications.showMessage.withArgs({
          type: 'info',
          header: 'Success',
          body: 'Your payment is successful finished.'
        }).called).to.equal(true);
      });
    });

    it('loadLastTransaction should work properly when transactionreference is defined', function () {
      // Arrange
      sinon.spy(cashBalanceFactory, 'getBalance');
      sinon.spy(financialService, 'getLastTransaction');
      rootScope.user = {
        transactionreference: '',
        balance: ''
      };

      var returnObject = {cash: 'cash'};
      httpBackend.whenGET(constant.API_URL + '/cashbalance').respond(returnObject);

      var returnObject2 = {transactionreference: 'transactionreference'};
      httpBackend.whenGET(constant.API_URL + '/secure/transaction').respond(returnObject2);

      // Act
      scope.loadLastTransaction();
      httpBackend.flush();

      // Assert
      expect(cashBalanceFactory.getBalance.called).to.equal(true);
      expect(rootScope.user.balance).to.equal(returnObject.cash);
      expect(financialService.getLastTransaction.called).to.equal(true);
      expect(scope.hasLastTransaction).to.equal(true);
    });

    it('loadLastTransaction should work properly when transactionreference is undefined', function () {
      // Arrange
      sinon.spy(cashBalanceFactory, 'getBalance');
      sinon.spy(financialService, 'getLastTransaction');
      rootScope.user = {
        balance: ''
      };
      var returnObject = {cash: 'cash'};
      httpBackend.whenGET(constant.API_URL + '/cashbalance').respond(returnObject);
      var returnObject2 = {transactionreference: ''};
      httpBackend.whenGET(constant.API_URL + '/secure/transaction').respond(returnObject2);

      // Act
      scope.loadLastTransaction();
      httpBackend.flush();

      // Assert
      expect(cashBalanceFactory.getBalance.called).to.equal(true);
      expect(rootScope.user.balance).to.equal(returnObject.cash);
      expect(scope.hasLastTransaction).to.equal(false);
    });

    it('setAmountAndPay should work properly', function () {
      // Arrange
      var amount = 1;
      sinon.spy(scope, 'payDeposit');

      // Act
      scope.setAmountAndPay(amount);

      // Assert
      expect(scope.amount).to.equal(amount);
      expect(scope.payDeposit.withArgs(amount).called).to.equal(true);
    });

    it('checkAcknowledge should work properly when scope.loadedAcknowledge is falsy', function () {
      // Arrange
      rootScope.user = {
        info: ''
      };
      sinon.spy(profileFactory, 'getUserInfo');
      sinon.spy(scope, 'loadLastTransaction');
      sinon.spy(storage, 'set');
      var returnObject = 'data';
      httpBackend.whenGET(constant.API_URL + '/user').respond(returnObject);
      httpBackend.whenGET(constant.API_URL + '/cashbalance').respond({cash: 'cash'});
      httpBackend.whenGET(constant.API_URL + '/secure/transaction').respond({transactionreference: 'transactionreference'});

      httpBackend.whenGET(constant.API_URL + '/account/depositlimits').respond({
        "dailyLimit": 0,
        "dailyLimitConfirmed": false,
        "weeklyLimit": 0,
        "weeklyLimitConfirmed": false,
        "monthlyLimit": 0,
        "monthlyLimitConfirmed": false,
        "depositLimitLeft": 0,
        "previousDailyLimit": 0,
        "previousWeeklyLimit": 0,
        "previousMonthlyLimit": 0,
        "nextDailyLimit": 0,
        "nextDailyLimitRequestTime": "",
        "nextDailyLimitActivationTime": "",
        "nextWeeklyLimit": 0,
        "nextWeeklyLimitRequestTime": "",
        "nextWeeklyLimitActivationTime": "",
        "nextMonthlyLimit": 0,
        "nextMonthlyLimitRequestTime": "",
        "nextMonthlyLimitActivationTime": ""
      });


      // Act
      scope.checkAcknowledge();
      httpBackend.flush();

      // Assert
      expect(rootScope.user.info).to.equal(returnObject);
      expect(profileFactory.getUserInfo.called).to.equal(true);
      expect(scope.loadLastTransaction.called).to.equal(true);
      expect(storage.set.withArgs('user-info', returnObject).called).to.equal(true);
      expect(scope.loadedAcknowledge).to.equal(true);
    });

    it('checkAcknowledge should return when scope.loadedAcknowledge is truthy', function () {
      // Arrange
      scope.loadedAcknowledge = true;

      // Act
      var result = scope.checkAcknowledge();

      // Assert
      expect(result).to.equal.null;
    });

    it('showAcknowledgePopup should work properly when scope.acknowledgeText is falsy', function () {
      // Arrange
      sinon.spy(policiesService, 'getFile');
      sinon.spy(notifications, 'showMessage');
      var returnObject = {
        result: 'result'
      };
      httpBackend.whenGET(constant.API_URL + '/policies/acknowledgment').respond(returnObject);

      // Act
      scope.showAcknowledgePopup();
      httpBackend.flush();

      // Assert
      expect(policiesService.getFile.called).to.equal(true);
      expect(scope.acknowledgeText).to.equal(returnObject.result);
      expect(notifications.showMessage.withArgs({
        type: 'info',
        header: 'Info',
        body: scope.acknowledgeText
      }).called).to.equal(true);
    });

    it('showAcknowledgePopup should return when scope.acknowledgeText is truthy', function () {
      // Arrange
      scope.acknowledgeText = true;

      // Act
      var result = scope.checkAcknowledge();

      // Assert
      expect(result).to.equal.null;
    });

    it('setAcknowledge should work properly', function () {
      // Arrange
      sinon.spy(AccountService, 'setFields');
      sinon.spy(profileFactory, 'getUserInfo');
      sinon.spy(storage, 'set');
      var params = {depositAcknowledgePassed: true},
        returnObject = 'data';
      httpBackend.whenPUT(constant.API_URL + '/account/profile/field').respond();
      httpBackend.whenGET(constant.API_URL + '/user').respond(returnObject);

      // Act
      scope.setAcknowledge();
      httpBackend.flush();

      // Assert
      expect(AccountService.setFields.withArgs(params).called).to.equal(true);
      expect(profileFactory.getUserInfo.called).to.equal(true);
      expect(rootScope.user.info).to.equal(returnObject);
      expect(storage.set.withArgs('user-info', returnObject).called).to.equal(true);
    });

    it('withdraw should work properly', function () {
      // Arrange
      sinon.spy(financialService, 'withdraw');
      sinon.spy(cashBalanceFactory, 'getBalance');
      sinon.spy(notifications, 'showMessage');
      scope.widthrawForm = 'form';
      var returnObject = {cash: 'cash'};
      httpBackend.whenPOST(constant.API_URL + '/secure/refundcft').respond();
      httpBackend.whenGET(constant.API_URL + '/cashbalance').respond(returnObject);

      // Act
      scope.withdraw();
      httpBackend.flush();

      // Assert
      expect(financialService.withdraw.called).to.equal(true);
      expect(cashBalanceFactory.getBalance.called).to.equal(true);
      expect(notifications.showMessage.withArgs({
        type: 'info',
        header: 'Withdrawal',
        body: "We have received your withdrawal request. The amount has been deducted from your balance. " +
        "Your withdrawal will be processed in 2-5 working days, subject to security, anti money laundering and identity checks. " +
        "Contact customer support if you need to confirm the last card you used. It's not possible to reverse a withdrawal."
      }).called).to.equal(true);

      expect(scope.widthrawForm).to.deep.equal({});
    });
  });
});
