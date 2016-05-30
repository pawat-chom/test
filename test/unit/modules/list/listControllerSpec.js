
define(function(require) {
  'use strict';

  var angular = require('angular');
  var listmodule = require('app/modules/list/list');
  var listcontrol, listctrl, scope, state, searchService, httpBackend;
  var constant;
  describe('List Module', function() {

  	beforeEach(module('common.services.search'));
    beforeEach(module('fame.list'));
	beforeEach(module('common.services.notifications'));

    beforeEach(inject(function($rootScope, $controller, $location,_searchService_,_$httpBackend_) {
    	searchService = _searchService_;
    	httpBackend = _$httpBackend_;
        scope = $rootScope.$new();
	    listctrl = $controller('listcontrol', {
	    	$scope: scope,
	    	searchService:searchService
	    });
    }));

    beforeEach(inject(function(_FAME_CONSTANTS_) {
    	constant = _FAME_CONSTANTS_
    }));

    beforeEach(inject(function(_FAME_CONSTANTS_) {
        constant = _FAME_CONSTANTS_
    }));

    it('should be a valid controller', function() {
      expect(listctrl).to.be.an('object');
    });

    describe('$scope', function() {

	      it('should has the search_results property', function() {
	        expect(scope.search_results).to.be.defined;
	      });

	      it('should has the listsearchview property', function() {
	        expect(scope.listsearchview).to.be.defined;
	      });


	      it('should has the listsearch property', function() {
	        expect(scope.listsearch).to.be.defined;
	      });

	      it('should has the listsearch property', function() {
	        expect(scope.isSelected('list.team')).to.not.be.true;
	        expect(scope.isSelected('list.squad')).to.not.be.true;
	        expect(scope.isSelected('list.buzz')).to.not.be.true;
	      });

		  it('should be a call showSearch', function () {
	           scope.showSearch();
	           expect(scope.searchVisible).to.be.true;
          });

		  it('should be a call hideSearch', function () {
	         scope.hideSearch();
	         expect(scope.searchVisible).to.be.false;
	      });

	      it('should be a call Search', function () {
	      	 scope.listsearch.text = 'tom ';
        	 var returnData = {"attributes":{"profile-image":{"value":"tom-ince-g-p1.jpg"}}};
             var url = constant.API_URL+'/search?q=tom';
        	 httpBackend.expectGET(url).respond(returnData);

	         scope.search();
	         expect(scope.listsearchview).to.be.false;
	      });

	      it('should be a goToPlayer', function () {
	      	 scope.listsearch.text = 'tom ';
        	 var returnData = {
        	 	"attributes":{"profile-image":{"value":"tom-ince-g-p1.jpg"}}
        	 };
             var url = constant.API_URL+'/search?q=tom';
        	 httpBackend.expectGET(url).respond(returnData);
        	 var id ='michael-carrick';
	         scope.goToPlayer(id);
	         expect(scope.listsearchview).to.be.false;
	      });

    });




  });

});
