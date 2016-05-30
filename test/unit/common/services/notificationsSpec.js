define(function (require) {
  'use strict';

  describe('notifications service:', function () {
    var rootScope, scope, notifications;

    describe('$rootScope.$broadcast', function () {
      beforeEach(function () {
        module('common.services.notifications');

        inject(function ($rootScope, _notifications_) {
          rootScope = $rootScope;
          notifications = _notifications_;
        });

        sinon.spy(rootScope, '$broadcast');
      });

      it('service should be defined', function () {
        expect(notifications).to.not.equal(null);
      });

      it('loadListOnPosition() should call broadcast with parameters', function () {
        // Arrange
        var param = 'param';

        // Act
        notifications.loadListOnPosition(param);

        // Assert
        expect(rootScope.$broadcast.withArgs('_LOAD_LIST_ON_POSITION_', param).called).to.equal(true);
      });

      it('cancelSearch() should call broadcast with parameters', function () {
        // Arrange
        var param = 'param';

        // Act
        notifications.cancelSearch(param);

        // Assert
        expect(rootScope.$broadcast.withArgs('_CANCEL_SEARCH_', param).called).to.equal(true);
      });

      it('requestStarted() should call broadcast', function () {
        // Arrange
        var param = 'param';

        // Act
        notifications.requestStarted(param);

        // Assert
        expect(rootScope.$broadcast.withArgs('_START_REQUEST_').called).to.equal(true);
      });

      it('requestEnded() should call broadcast', function () {
        // Arrange
        var param = 'param';

        // Act
        notifications.requestEnded(param);

        // Assert
        expect(rootScope.$broadcast.withArgs('_END_REQUEST_').called).to.equal(true);
      });

      it('updatePortfolio() should call broadcast', function () {
        // Arrange
        var data = 'data';

        // Act
        notifications.updatePortfolio(data);

        // Assert
        expect(rootScope.$broadcast.withArgs('_UPDATE_PORTFOLIO_', data).called).to.equal(true);
      });

      it('updateValidation() should call broadcast', function () {
        // Arrange
        var data = 'data';

        // Act
        notifications.updateValidation(data);

        // Assert
        expect(rootScope.$broadcast.withArgs('_UPDATE_VALIDATION_', data).called).to.equal(true);
      });

      it('updateVote() should call broadcast', function () {
        // Arrange
        var data = 'data';

        // Act
        notifications.updateVote(data);

        // Assert
        expect(rootScope.$broadcast.withArgs('_UPDATE_VOTE_', data).called).to.equal(true);
      });

      it('updateBuypopover() should call broadcast', function () {
        // Arrange
        var data = 'data';

        // Act
        notifications.updateBuypopover(data);

        // Assert
        expect(rootScope.$broadcast.withArgs('_UPDATE_BUYPOPOVER_', data).called).to.equal(true);
      });

      it('updateSellpopover() should call broadcast', function () {
        // Arrange
        var data = 'data';

        // Act
        notifications.updateSellpopover(data);

        // Assert
        expect(rootScope.$broadcast.withArgs('_UPDATE_SELLPOPOVER_', data).called).to.equal(true);
      });

      it('showMessage() should call broadcast', function () {
        // Arrange
        var data = 'data';

        // Act
        notifications.showMessage(data);

        // Assert
        expect(rootScope.$broadcast.withArgs('_SHOW_MESSAGE_', data).called).to.equal(true);
      });

      it('updateEnvMode() should call broadcast', function () {
        // Arrange
        var data = 'data';

        // Act
        notifications.updateEnvMode(data);

        // Assert
        expect(rootScope.$broadcast.withArgs('_UPDATE_ENVMODE_', data).called).to.equal(true);
      });

      it('updateRefresh() should call broadcast', function () {
        // Arrange
        var data = 'data';

        // Act
        notifications.updateRefresh(data);

        // Assert
        expect(rootScope.$broadcast.withArgs('_REFRESH_LIST_', data).called).to.equal(true);
      });

      it('updateAccountTap() should call broadcast', function () {
        // Arrange
        var data = 'data';

        // Act
        notifications.updateAccountTap(data);

        // Assert
        expect(rootScope.$broadcast.withArgs('_UPDATE_ACCOUNT_TAP_', data).called).to.equal(true);
      });

      it('showLoadingSpinner() should call broadcast', function () {
        // Arrange
        var data = 'data';

        // Act
        notifications.showLoadingSpinner(data);

        // Assert
        expect(rootScope.$broadcast.withArgs('_SHOW_LOADING_SPINNER_', data).called).to.equal(true);
      });
    });

    describe('$scope.$on', function () {
      beforeEach(function () {
        module('common.services.notifications');

        inject(function ($rootScope, _notifications_) {
          scope = $rootScope.$new();
          notifications = _notifications_;
        });

        sinon.spy(scope, '$on');
      });

      it('onShowLoadingSpinner() should call on', function () {
        // Arrange
        var handler = function() {};

        // Act
        notifications.onShowLoadingSpinner(scope, handler);

        // Assert
        expect(scope.$on.withArgs('_SHOW_LOADING_SPINNER_').called).to.equal(true);
      });

      it('onLoadListOnPosition() should call on', function () {
        // Arrange
        var handler = function() {};

        // Act
        notifications.onLoadListOnPosition(scope, handler);

        // Assert
        expect(scope.$on.withArgs('_LOAD_LIST_ON_POSITION_').called).to.equal(true);
      });

      it('onCancelSearch() should call on', function () {
        // Arrange
        var handler = function() {};

        // Act
        notifications.onCancelSearch(scope, handler);

        // Assert
        expect(scope.$on.withArgs('_CANCEL_SEARCH_').called).to.equal(true);
      });

      it('onUpdatePortfolio() should call on', function () {
        // Arrange
        var handler = function() {};

        // Act
        notifications.onUpdatePortfolio(scope, handler);

        // Assert
        expect(scope.$on.withArgs('_UPDATE_PORTFOLIO_').called).to.equal(true);
      });

      it('onUpdateValidation() should call on', function () {
        // Arrange
        var handler = function() {};

        // Act
        notifications.onUpdateValidation(scope, handler);

        // Assert
        expect(scope.$on.withArgs('_UPDATE_VALIDATION_').called).to.equal(true);
      });

      it('onUpdateVote() should call on', function () {
        // Arrange
        var handler = function() {};

        // Act
        notifications.onUpdateVote(scope, handler);

        // Assert
        expect(scope.$on.withArgs('_UPDATE_VOTE_').called).to.equal(true);
      });

      it('onUpdateBuypopover() should call on', function () {
        // Arrange
        var handler = function() {};

        // Act
        notifications.onUpdateBuypopover(scope, handler);

        // Assert
        expect(scope.$on.withArgs('_UPDATE_BUYPOPOVER_').called).to.equal(true);
      });

      it('onUpdateSellpopover() should call on', function () {
        // Arrange
        var handler = function() {};

        // Act
        notifications.onUpdateSellpopover(scope, handler);

        // Assert
        expect(scope.$on.withArgs('_UPDATE_SELLPOPOVER_').called).to.equal(true);
      });

      it('onShowMessage() should call on', function () {
        // Arrange
        var handler = function() {};

        // Act
        notifications.onShowMessage(scope, handler);

        // Assert
        expect(scope.$on.withArgs('_SHOW_MESSAGE_').called).to.equal(true);
      });

      it('onUpdateEnvMode() should call on', function () {
        // Arrange
        var handler = function() {};

        // Act
        notifications.onUpdateEnvMode(scope, handler);

        // Assert
        expect(scope.$on.withArgs('_UPDATE_ENVMODE_').called).to.equal(true);
      });

      it('onUpdateRefresh() should call on', function () {
        // Arrange
        var handler = function() {};

        // Act
        notifications.onUpdateRefresh(scope, handler);

        // Assert
        expect(scope.$on.withArgs('_REFRESH_LIST_').called).to.equal(true);
      });

      it('onUpdateAccountTap() should call on', function () {
        // Arrange
        var handler = function() {};

        // Act
        notifications.onUpdateAccountTap(scope, handler);

        // Assert
        expect(scope.$on.withArgs('_UPDATE_ACCOUNT_TAP_').called).to.equal(true);
      });
    });
  })
});