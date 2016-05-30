define(function(require) {
  'use strict';

  require([
    'angular',
    'app/modules/account/account'
  ]);

  var detailsController, rootScope, scope, profileFactory,
    httpBackend, constant;

  describe('details controller:', function() {
    beforeEach(module('ui.router', 'common.services.notifications', 'fame.account', 'common.services.profile'));

    beforeEach(inject(function($controller, $rootScope, _profileFactory_, $httpBackend, _FAME_CONSTANTS_) {
      rootScope = $rootScope;
      scope = {
        showLoading: function() {}
      };
      profileFactory = _profileFactory_;
      httpBackend = $httpBackend;
      constant = _FAME_CONSTANTS_;

      detailsController = $controller('detailsController', {
        $scope: scope
      })
    }));

    it('should be a valid controller', function() {
      expect(detailsController).to.be.defined;
    });

    it('default values should be set', function() {
      // Arrange
      sinon.spy(profileFactory, 'getProfile');
      rootScope.user = {
        profile: ''
      };

      var returnObject = {
        displayName: 'name',
        city: 'city',
        street: 'street',
        housenumber: 'housenumber',
        postcode: 'postcode',
        phone: 'phone'
      };
      httpBackend.whenGET(constant.API_URL + '/account/profile').respond(returnObject);

      // Act
      httpBackend.flush();

      // Assert
      //expect(profileFactory.getProfile.calledOnce).to.equal(true);
      expect(rootScope.user.profile).to.deep.equal(returnObject);
      expect(scope.aboutSection).to.deep.equal({
        displayName: returnObject.displayName,
        section: 'about'
      });
      expect(scope.addressSection).to.deep.equal({
        city: returnObject.city,
        street: returnObject.street,
        housenumber: returnObject.housenumber,
        postcode: returnObject.postcode,
        phone: returnObject.phone,
        section: 'address'
      });
      expect(scope.contactPreferences).to.deep.equal({
        section: 'contact-preferences',
        contactPreferences: returnObject.contactPreferences
      });
      expect(scope.profileLoaded).to.equal(true);
    });

    it('saveFields should work properly', function() {
      // Arrange
      var aboutFields = 'aboutFields';
      sinon.spy(profileFactory, 'setProfile');

      // Act
      scope.saveFields(aboutFields);

      // Assert
      expect(profileFactory.setProfile.calledOnce).to.equal(true);
    })
  })
});