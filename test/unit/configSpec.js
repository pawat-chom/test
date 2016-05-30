define(function (require) {
  'use strict';

  require(['angular', 'app/config']);

  describe('fame.config module:', function () {
    beforeEach(module('common.services.notifications'));

    describe('constant and value blocks should run properly', function () {
      beforeEach(function () {
        module('fame.config', function ($provide) {
        });
      });

      it('should have constants', inject(function ($injector) {
        expect($injector.get('VERSION')).to.equal('0.1');
        expect($injector.get('END_POINT_TO_DEV')).to.deep.equal({
          'API_URL': 'https://api-dev.footballindex.co.uk',
          'PAYMENT_TAG': 'mobile-local',
          'GA_ID' : 'UA-69909895-1'
        });
        expect($injector.get('END_POINT_TO_PRODUCTION')).to.deep.equal({
          'API_URL': 'https://api-prod.footballindex.co.uk',
          'PAYMENT_TAG' : 'mobile-prod',
          'GA_ID' : 'UA-66205606-1'
        });
        expect($injector.get('END_POINT_TO_FREEPLAY')).to.deep.equal({
          'API_URL': 'https://api-freeplay.footballindex.co.uk',
          'PAYMENT_TAG': 'mobile'
        });
        expect($injector.get('ERRORS')).to.deep.equal({
          'SIGNUP': {
            email: 'Email already exists',
            username: 'Username already exists'
          }
        });
        /*
        expect(JSON.stringify($injector.get('FAME_CONSTANTS'))).to.equal(JSON.stringify({
          'BUZZ_URL': 'https://api-buzz.footballindex.co.uk',
          'GA_ID': 'UA-66205606-1',
          'LOGOUT_TIMEOUT': 5400000,
          'IMAGE_SERVER': "https://8ed27e295c069f7c2fcc-49359ffd7d49a1ba1eba07f403020e19.ssl.cf2.rackcdn.com",
          'API_URL': "https://api-dev.footballindex.co.uk",
          'PAYMENT_TAG': "mobile-local"
        }));
        */
      }));
    });

    describe('run block should work properly', function () {
      var rootScope, notifications;

      beforeEach(function () {
        module('fame.config', function ($provide) {
          $provide.value('notifications', {
            onUpdateEnvMode: sinon.spy()
          });
        });

        inject(function ($rootScope, _notifications_) {
          rootScope = $rootScope;

          notifications = _notifications_;
        });
      });

      it('should start logging service', function () {
        expect(rootScope.ENV).to.equal('production');
        expect(notifications.onUpdateEnvMode.called).to.equal(true);
      });
    });
  })
});