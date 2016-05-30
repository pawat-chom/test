/*
define(function(require) {
  'use strict';
  var angular = require('angular'),
    searchModule = require('app/modules/search/search'),
    searchServiceModule = require('app/common/services/search'),
    configModule = require('app/config'),
    createController, ctrl, scope, _$stateParams, $httpBackend, constant, searchFactory;
    describe('Search controller', function() {
    beforeEach(module('common.services.search'));
    beforeEach(module('ernr.search'));
    beforeEach(module('ernr.config'));

    beforeEach(function() {
      inject(function($rootScope, $controller, _$httpBackend_, ERNR_CONSTANTS, _searchFactory_) {
        scope = $rootScope.$new();
        constant = ERNR_CONSTANTS;
        _$stateParams = {keywords: "test"};
        $httpBackend = _$httpBackend_;
        searchFactory = _searchFactory_;
        createController = function() {
          return $controller('searchController', {
            $scope: scope,
            $stateParams: _$stateParams
          });
        };

        // Create controller
        ctrl = createController();
      })
    });

    describe('loadMore method', function() {
      it('should send a request', function() {
        var spy = sinon.spy(searchFactory, 'find');
        scope.onLoading = false;
        scope.noMoreItemsAvailable = false;
        var page = 1;
        scope.params = {
          page: page,
          per_page: 20,
          q: 'test'
        };
        $httpBackend.whenGET(constant.search + "/elasticsearch/find?page=1&per_page=20&q=test").respond(
          {
            result: {
              "count": 20,
              "items": [{item: 1}, {item: 2}],
              "page": 1,
              "per_page": 20,
              "total": 90
            }
          }
        );
        scope.loadMore();
        scope.$digest(); // Update values
        $httpBackend.flush();

        expect(scope.results).to.eql([{item: 1}, {item: 2}]);
        expect(scope.onLoading).to.be.false;
        expect(scope.params.page).to.equal(page + 1);
        expect(scope.stopLoadMore).to.be.false; // 90 < 2
        expect(spy).called;
      });

      it('should not send request', function() {
        var spy = sinon.spy(searchFactory, 'find');
        scope.onLoading = true;
        scope.noMoreItemsAvailable = false;
        var page = 1;
        scope.params = {
          page: page,
          per_page: 20,
          q: 'test'
        };
        scope.loadMore();
        scope.$digest(); // Update values
        expect(spy).not.called;
      });
    });
  });
});
*/