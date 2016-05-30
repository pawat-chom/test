
define(function(require) {
  'use strict';

  var angular = require('angular');
  var feedModule = require('app/common/directives/feed/feed');

  var scope,element,controller,constant,httpBackend,compile;
  var feedService,voteService,voteService2, template,agent,notifications;

  describe('feed Directive', function() {

  	beforeEach(module('common.services.notifications'));
  	beforeEach(module('common.services.vote'));
  	beforeEach(module('common.services.feed'));
	  beforeEach(module('common.directives.feed'));

    beforeEach(inject(function($httpBackend,_FAME_CONSTANTS_,_feedService_ ,_voteService_) {
        constant = _FAME_CONSTANTS_;
        httpBackend = $httpBackend;
        feedService =  _feedService_;
        voteService = _voteService_;
    }));

    beforeEach(inject(function(_notifications_) {
      notifications = _notifications_;
    }));

    beforeEach(function() {
      inject(function(_$compile_, $rootScope) {
        compile = _$compile_;
        scope = $rootScope.$new();
        element = angular.element('<feed show-view="list" show-filter="true" sector="football.all" feed-template="team"></feed>');

        template = compile(element)(scope);

        var returnData = {"page":1,"per_page":20,"count":20,"total":200,
        "items":[{"attributes":{"profile-image":{"value":"lionel-messi-g-p3.jpg"},"server-url":{"value":"imgs.footballindex.co.uk"},"thumbnail-image":{"value":"lionel-messi-g-t2.jpg"},"optimized_image":"lionel-messi-g-t3.jpg"},"id":"lionel-messi","name":"Lionel Messi","team":"Barcelona","rank":1,"score":"1.5029999999999999","sectors":{"all":{"name":"all","rank":1},"second":{"name":"Striker","rank":1},"third":{"name":"all","rank":1}},"type":{"id":"celeb","name":"Celebrity"},"urlname":"lionel-messi","buzznews":{"title":"Barcelona’s mighty Lionel Messi ready for encore against Bayern Munich","total":56},"history":{"20150802":{"sectors":{"all":{"name":"all","rank":1},"second":{"name":"Striker","rank":1},"third":{"name":"all","rank":1}},"rank":1,"trending":24},"20150803":{"sectors":{"all":{"name":"all","rank":1},"second":{"name":"Striker","rank":1},"third":{"name":"all","rank":1}},"rank":1,"trending":94}},"buzzscore":260,"wikiurl":"https://en.wikipedia.org/wiki/Lionel_Messi","optaid":"p19054","optateamid":"t178","optacompid":"23"},
                 {"attributes":{"profile-image":{"value":"philippe-coutinho-g-p1.jpg"},"server-url":{"value":"imgs.footballindex.co.uk"},"thumbnail-image":{"value":"philippe-coutinho-g-t2.jpg"},"optimized_image":"philippe-coutinho-g-t3.jpg"},"id":"philippe-coutinho","name":"Philippe Coutinho","team":"Liverpool","rank":2,"score":"1.464","sectors":{"all":{"name":"all","rank":2},"second":{"name":"Midfielder","rank":1},"third":{"name":"all","rank":2}},"type":{"id":"celeb","name":"Celebrity"},"urlname":"philippe-coutinho","buzznews":{"title":"Liverpool ace Philippe Coutinho on his new contract, Youtube clips and Terry's PFA vote","total":8},"history":{"20150802":{"sectors":{"all":{"name":"all","rank":2},"second":{"name":"Midfielder","rank":1},"third":{"name":"all","rank":2}},"rank":2,"trending":58},"20150803":{"sectors":{"all":{"name":"all","rank":2},"second":{"name":"Midfielder","rank":1},"third":{"name":"all","rank":2}},"rank":2,"trending":26}},"buzzscore":0,"wikiurl":"https://en.wikipedia.org/wiki/Philippe_Coutinho","optaid":"p19054","optateamid":"t14","optacompid":"8"}
                 ] };

        var url = constant.API_URL+'/football.all/?page=1&per_page=20';
        httpBackend.expectGET(url).respond(returnData);
        httpBackend.flush();

        controller = element.controller();
        scope = element.isolateScope() || element.scope();
        scope.$digest();

      });
    });

    it(':loadMore should work', function() {
      agent = sinon.spy(scope,'loadMore');
      scope.loadMore();
      expect(agent.calledOnce).to.equal(true);
    });

    it(':doRefresh method should work', function() {
      agent = sinon.spy(scope,'doRefresh');
      scope.doRefresh();
      expect(agent.calledOnce).to.equal(true);
    });

    it(': parseFloat method should work', function() {
      expect(scope.parseFloat('1.163')==1.16).to.be.true
    });

    it(': yesterday day should be correct', function() {

        var date = new Date();
        var resultDate = new Date(date.setDate(date.getDate() - 1));

        var yyyy = resultDate.getUTCFullYear().toString(),
            mm = (resultDate.getUTCMonth() + 1).toString(), // getUTCMonth() is zero-based
            dd = resultDate.getUTCDate().toString();
        var result = yyyy + (mm[1] ? mm : "0" + mm[0]) + (dd[1] ? dd : "0" + dd[0]); // padding

          expect(scope.yesterday).to.equal(result);
    });

    it(': onLoadListOnPosition should work', function() {
        agent = sinon.spy(scope, 'doRefresh');
        notifications.loadListOnPosition(10);
        expect(agent.calledOnce).to.equal(true);
    });

    it(': onCancelSearch should work', function() {
        notifications.loadListOnPosition(10);
        notifications.cancelSearch();
        expect(scope.params.from).to.be.undefined;
    });
/*
    it.only(': onUpdateVote should work', function() {
        scope.loadMore();
        var data = {
          id : 'lionel-messi',
          response : { voting : { up: 10 }}
        }
        notifications.updateVote(data);
        expect(scope.results[0].voting.up).to.to.equal(10);
    });
*/
  });

});