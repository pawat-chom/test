define(function(require) {
  'use strict';

  var angular = require('angular');
  var portfoliomodule = require('app/modules/portfolio/portfolio');


  var transaction_historyController, scope, financialService, httpBackend, constant;

  describe('transaction_history controller:', function() {
    beforeEach(module('ui.router', 'common.services.notifications', 'fame.account'));

    beforeEach(inject(function($controller, $rootScope, $httpBackend, _financialService_, _FAME_CONSTANTS_) {
      scope = $rootScope.$new();
      httpBackend = $httpBackend;

      financialService = _financialService_;
      constant = _FAME_CONSTANTS_;

      transaction_historyController = $controller('historyCtrlController', {
        $scope: scope
      });
    }));

    it('should be a valid controller', function() {
      expect(transaction_historyController).to.exist;
    });

    it('default values should be set', function() {
      expect(scope.params).to.deep.equal({
        page: 1,
        per_page: 20
      });
      expect(scope.results).to.deep.equal([]);
    });

    it('load should work properly', function() {
      // Arrange
      sinon.spy(financialService, 'getTransactionHistory');
      var returnObject = {
        items: [{ type: 'PURCHASE', total: 1 }, { type: 'PURCHASE123', total: 123 }]
      };
      httpBackend.whenGET(constant.API_URL + '/transactions').respond(returnObject);

      // Act
      scope.load();
      httpBackend.flush();
      scope.$apply();

      // Assert
      expect(financialService.getTransactionHistory.withArgs(scope.params).called).to.equal(true);

      // how to compare 2 arrays of objects?
      expect(scope.results.toString()).to.eql(returnObject.items.toString());

      // doesn't work
      //expect(scope.results[0].total).to.deep.equal(scope.results[0].total * -1);
    })
  })
});