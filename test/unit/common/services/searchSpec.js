
define(function(require) {
  'use strict';

   var angular = require('angular');
   var searchModule = require('app/common/services/search'),
       searchService,httpBackend, constant;
   var constant;
    describe('Search Service', function() {

      beforeEach(module('common.services.search'));
      beforeEach(module('common.services.notifications'));

      beforeEach(function () {
        inject(function ($httpBackend,_searchService_ ){
            searchService = _searchService_;
            httpBackend = $httpBackend;
        });
      });

      beforeEach(inject(function(_FAME_CONSTANTS_) {
        constant = _FAME_CONSTANTS_
      }));


      it('should be a valid services', function() {
        expect(searchService).to.be.an('object');

      });

      it('find method should make a request', function() {

        var text = 'tom ';
        var returnData = {"attributes":{"profile-image":{"value":"tom-ince-g-p1.jpg"}}};
        var url = constant.API_URL+'/search?q='+text;

        httpBackend.expectGET(url).respond(returnData);

        var result;
        searchService.find(text).then(function(res){
            result = res.data;
        });

        httpBackend.flush();

        expect(result).to.deep.equal(returnData);
      });

      it('findsquad method should make a request', function() {

        var text = "tom";
        var topic = "footballvoting.all";
        var returnData = {"attributes":{"profile-image":{"value":"tom-ince-g-p1.jpg"}}};
        var url = constant.API_URL+'/search?q='+text+'&topic='+topic;

        httpBackend.expectGET(url).respond(returnData);

        var result;
        searchService.findsquad(text,topic).then(function(res){
            result = res.data;
        });

        httpBackend.flush();

        expect(result).to.deep.equal(returnData);
      });

      it('findRank  method should make a request', function() {

        var text = "tom";
        var topic = "football.all";
        var returnData = {"attributes":{"profile-image":{"value":"tom-ince-g-p1.jpg"}}};
        var url = constant.API_URL+'/searchrank?q='+text+'&topic='+topic;

        httpBackend.expectGET(url).respond(returnData);

        var result;
        searchService.findRank(text,topic).then(function(res){
            result = res.data;
        });

        httpBackend.flush();

        expect(result).to.deep.equal(returnData);
      });

    });

});