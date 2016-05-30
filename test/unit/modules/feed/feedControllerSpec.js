define(function (require) {
  'use strict';

  require('angular');
  require('app/modules/feed/feed');
  require('app/libs');

  var feedController, scope, httpBackend, constant,
    trendingService, winnersService, trackerService, userActivityService;

  describe('Feed controller:', function () {

    beforeEach(module('ui.router', 'common.services.notifications', 'fame.feed'));

    beforeEach(inject(function ($rootScope, $controller, $httpBackend,
                                _trendingService_, _winnersService_, _trackerService_, _userActivityService_, _FAME_CONSTANTS_) {
        scope = {
          $broadcast: function () {
          }
        };
        httpBackend = $httpBackend;
        trendingService = _trendingService_;
        winnersService = _winnersService_;
        trackerService = _trackerService_;
        userActivityService = _userActivityService_;
        constant = _FAME_CONSTANTS_;

        feedController = $controller('feedController', {
          $scope: scope
        });
      })
    );

    it('should be a valid controller', function () {
      expect(feedController).to.be.defined;
    });

    it('default values should be set', function () {
      expect(scope.viewMode).to.equal("winners");
      expect(scope.yesterday).to.be.defined;
      expect(scope.trending).to.be.empty;
      expect(scope.winner).to.be.empty;
      expect(scope.userActivity).to.be.empty;
      expect(scope.tracker100Price).to.equal(0);
      expect(scope.tracker200Price).to.equal(0);
      expect(scope.trackers.length).to.equal(3);

      expect(trendingService).to.be.defined;
      expect(winnersService).to.be.defined;
      expect(trackerService).to.be.defined;
      expect(userActivityService).to.be.defined;
    });

    it('setViewMode should working properly', function () {
      // Arrange
      var mode = 'testmode';

      // Act
      scope.setViewMode(mode);

      // Assert
      expect(scope.viewMode).to.equal(mode);
    });

    it('doRefresh should work properly', function () {
      // Arrange
      var httpGetReturnObject = {
        items: [
          {
            id: 1,
            name: 1
          }, {
            id: 2,
            name: 2
          }
        ]
      };
      var getTrackerReturnObject = {
        value: [
          {
            id: 1,
            name: 1
          }, {
            id: 2,
            name: 2
          }
        ]
      };

      httpBackend.whenGET(constant.API_URL + '/trending?v=2&page=1&per_page=5').respond(httpGetReturnObject);
      httpBackend.whenGET(constant.BUZZ_URL + '/winners/footballuk/1').respond(httpGetReturnObject);
      httpBackend.whenGET(constant.API_URL + '/tracker25').respond(httpGetReturnObject);
      httpBackend.whenGET(constant.API_URL + '/tracker50').respond(httpGetReturnObject);
      httpBackend.whenGET(constant.API_URL + '/tracker100').respond(httpGetReturnObject);
      httpBackend.whenGET(constant.API_URL + '/transactions/activity?num=3').respond(httpGetReturnObject);
      httpBackend.whenGET(constant.API_URL + '/footie').respond(httpGetReturnObject);

      sinon.spy(trendingService, 'getTrending');
      sinon.spy(winnersService, 'getWinner');
      sinon.spy(trackerService, 'getTrackerPrice');
      sinon.spy(userActivityService, 'getUserActivity');

      // Act
      scope.doRefresh();
      httpBackend.flush();

      // Assert
      expect(trendingService.getTrending).to.have.been.called;
      expect(scope.trending).to.deep.equal(httpGetReturnObject.items);

      expect(winnersService.getWinner).to.have.been.called;
      expect(scope.winner).to.deep.equal(httpGetReturnObject.items[0]);

      expect(trackerService.getTrackerPrice).to.have.been.called;
      expect(trackerService.getTrackerPrice.calledThrice).to.be.true;
      expect(scope.trackers[0].price).to.deep.equal(getTrackerReturnObject.data);
      expect(scope.trackers[1].price).to.deep.equal(getTrackerReturnObject.data);
      expect(scope.trackers[2].price).to.deep.equal(getTrackerReturnObject.data);

      expect(userActivityService.getUserActivity).to.have.been.called;
      expect(scope.userActivity).to.deep.equal(httpGetReturnObject);
    })
  });
});

