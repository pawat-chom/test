
define(function(require) {
  'use strict';
  var angular = require('angular');

  var profileServiceModule = require('app/modules/profile/services/profile'),
      profileService,
      httpBackend;


  describe('Profile service', function() {

    beforeEach(module('fame.profile.profileService'));
    beforeEach(module('common.services.notifications'));

    beforeEach(function() {
      inject(function(_profileService_) {
        profileService = _profileService_;
      });
    });

    it('should be a valid service', function() {
      expect(profileService).to.be.an('object');
    });

  });


});