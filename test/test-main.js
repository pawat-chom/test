var tests = [];

for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

requirejs.config({
  // Karma serves files from '/base'
  baseUrl: '/base',
  // runtime paths and shims
  paths: {
    // end of network components
    angular: 'www/lib/angular/angular',
    angularMocks: 'www/lib/angular-mocks/angular-mocks',
    angularAnimate: 'www/lib/angular-animate/angular-animate',
    angularSanitize: 'www/lib/angular-sanitize/angular-sanitize',
    angularMocks: 'www/lib/angular-mocks/angular-mocks',
    angularResource: 'www/lib/angular-resource/angular-resource',
    uiRouter: 'www/lib/angular-ui-router/release/angular-ui-router',
    angularLocalStorage: 'www/lib/angularLocalStorage/src/angularLocalStorage',
    angularCookies: 'www/lib/angular-cookies/angular-cookies',
    ngCordova: 'www/lib/ngCordova/dist/ng-cordova',
    ionic: 'www/lib/ionic/release/js/ionic',
    ionicAngular: 'www/lib/ionic/release/js/ionic-angular',
    restangular: 'www/lib/restangular/dist/restangular',
    angularModalService: 'www/lib/angular-modal-service/dst/angular-modal-service',
    ngTagsInput: 'www/lib/ng-tags-input/ng-tags-input',
    angularFileUpload: 'www/lib/ng-file-upload/angular-file-upload',
    ngTouch: 'www/lib/angular-touch/angular-touch',
    angularMoment: 'www/lib/angular-moment/angular-moment',
    mentio: 'www/lib/ment.io/dist/mentio',
    moment: 'www/lib/moment/moment',

    // The app code itself
    app: 'www/javascripts/app',

    // Requirejs plugin
    text: 'www/lib/requirejs-text/text',
    lodash: 'www/lib/lodash/lodash',
    async: 'www/lib/requirejs-plugins/src/async',
    propertyParser: 'www/lib/requirejs-plugins/src/propertyParser',
    font: 'www/lib/requirejs-plugins/src/font',

    // Test dependencies
    chai: 'node_modules/chai/chai',
    'chai-as-promised': 'node_modules/chai-as-promised/lib/chai-as-promised',
    sinon: 'node_modules/sinon/lib/sinon',
    'sinon-chai': 'node_modules/sinon-chai/lib/sinon-chai',

    googleAnalytics: [
      "//www.google-analytics.com/analytics",
      "data:application/javascript,"
    ]
  },

  shim: {
    angular: {exports: 'angular'},
    angularAnimate: {deps: ['angular']},
    angularSanitize: {deps: ['angular']},
    angularMocks: {deps: ['angular']},
    angularResource: {deps: ['angular']},
    angularCookies: {deps: ["angular"]},
    angularModalService: {deps: ["angular"]},
    angularLocalStorage: {deps: ["angular", "angularCookies"]},
    ngCordova: {deps: ['angular']},
    restangular: {deps: ['angular']},
    uiRouter: {deps: ['angular']},
    ngTagsInput: {deps: ['angular']},
    angularFileUpload: {deps: ['angular']},
    ngTouch: {deps: ['angular']},
    angularMoment: {deps: ['moment', 'angular']},
    mentio: { deps: ['angular']},
    ionic: {deps: ['angular'], exports: 'ionic'},
    ionicAngular: {deps: ['angular', 'ionic', 'uiRouter', 'angularAnimate', 'angularSanitize']},
    font: {deps: ['propertyParser']},
    googleAnalytics :  {
      exports: "ga"
    }
  },

  // ask Require.js to load these files (all our tests)
  deps: tests

  // start test run, once Require.js is done
  //callback: window.__karma__.start
});

require([
  'chai',
  'chai-as-promised',
  'sinon-chai'
], function(chai, chaiaspromised, sinonChai) {
  'use strict';

  window.chai = chai;
  chai.use(chaiaspromised);
  chai.use(sinonChai);

  // window.assert = chai.assert;
  window.expect = chai.expect;
  // should = chai.should();

  require(tests, function() {
    window.__karma__.start();
  });
});
