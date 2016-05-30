
define(function(require) {
  'use strict';
  var angular = require('angular');

  var voteServiceModule = require('app/common/services/vote'),
      voteService,
      httpBackend,
      constant;


  describe('vote service', function() {

    beforeEach(module('common.services.vote'));
    beforeEach(module('common.services.notifications'));
    beforeEach(module('ui.router'));

    beforeEach(function() {
      inject(function($httpBackend,_voteService_) {
        httpBackend = $httpBackend;
        voteService = _voteService_;
      });
    });

    beforeEach(inject(function(_FAME_CONSTANTS_) {
        constant = _FAME_CONSTANTS_
    }));

    it('should be a valid service', function() {
      expect(voteService).to.be.an('object');
    });

    it('should has the feed method', function() {
      expect(voteService.vote).to.be.an('function');
    });

    it('should be vote up', function() {

      var id = 'tom-ince';
      var direction = 'up' // down
      var returnData = {"attributes":{"profile-image":{"value":"tom-ince-g-p1.jpg"}}};
      var url = constant.API_URL+'/voting/'+direction+'/'+id;

      httpBackend.expectGET(url).respond(returnData);

      var result;
      voteService.vote(direction, id).then(function(res){
          result = res;
      });

      httpBackend.flush();

      expect(result).to.deep.equal(returnData);

    });

  });


});