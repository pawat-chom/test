define(function() {
  'use strict';

  describe('cashbalance module', function() {
    var httpBackend, constant, cashBalanceFactory;

    beforeEach(function() {
      module('common.services.cashbalance', 'common.services.notifications');

      inject(function($httpBackend, _FAME_CONSTANTS_, _cashBalanceFactory_) {
        httpBackend = $httpBackend;
        constant = _FAME_CONSTANTS_;
        cashBalanceFactory = _cashBalanceFactory_;
      })
    });

    it('cashBalanceFactory should be defined', function() {
      expect(cashBalanceFactory).to.not.equal(null);
    });

    it('getBalance() should return result from API call', function() {
      // Arrange
      var returnObject = 'data';
      httpBackend.expectGET(constant.API_URL + '/cashbalance').respond(returnObject);

      // Act
      var result;
      cashBalanceFactory.getBalance().then(function(response) {
        result = returnObject;
      });
      httpBackend.flush();

      // Assert
      expect(result).to.not.equal(null);
      expect(result).to.equal(returnObject);
    })
  })
});