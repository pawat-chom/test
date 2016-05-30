module.exports = function (grunt) {

  var path = require('path');
  var fs = require('fs');
  var _ = require('underscore');



  // Config for mochaWebDriver tests
  var TRAVIS_END_DATA = 'Fame500, commit:' + process.env.CI_COMMIT_ID;

  var webDriverTestsSrc = [
      'tests/promiseChainMethods/*.js',
      'tests/mainPage/links.js',
      'tests/mainPage/news.js',
      'tests/mainPage/search.js',
      'tests/mainPage/fameList.js',
      'tests/mainPage/buingTool.js',
      'tests/facebook/login.js',
      'tests/transactions/transactionsFromMainPage.js'
    ],
    webDriverTestsProdExpressSrc = [
      'tests/prod_express/*.js',
    ];


  grunt.config.set('mochaWebdriver', {
    options: {
      timeout: 1000 * 60 * 3,
      reporter: 'spec',
      usePromises: true
    },
    phantom: {
      src: webDriverTestsSrc,
      options: {
        testName: 'phantom test',
        usePhantom: true,
        phantomPort: 5555,
        browsers: []
      }
    },
    phantom_prodexpress: {
      src: webDriverTestsProdExpressSrc,
      options: {
        testName: 'phantom test',
        usePhantom: true,
        phantomPort: 5555,
        browsers: []
      }
    },
    sauce: {
      src: webDriverTestsSrc,
      options: {
        username: 'akalininv',
        key: '899a7290-a8ec-4df9-9104-e32160e2042f',
        testName: process.env.CI ? TRAVIS_END_DATA : 'Fame500 local tests',
        concurrency: 5,
        testTags: [''],
        build: process.env.CI_BUILD_NUMBER || 'local',
        browsers: [
          // {'screen-resolution': '1600x1200', browserName: 'internet explorer', platform: 'Windows 7', version: '9'},
          // {'screen-resolution': '1600x1200',browserName: 'internet explorer', platform: 'Windows 7', version: '10'},
          // {'screen-resolution': '1600x1200',browserName: 'internet explorer', platform: 'Windows 7', version: '11'},
          {
            'screen-resolution': '1600x1200',
            browserName: 'chrome',
            platform: 'Windows 7',
            version: ''
          },
          // {'screen-resolution': '1600x1200',browserName: 'firefox', platform: 'Windows 7', version: '30'}
        ]
      }
    },
    selenium: {
      src: webDriverTestsSrc,
      options: {
        testName: 'selenium test',
        concurrency: 2,
        hostname: '127.0.0.1',
        port: '4444',
        autoInstall: true,
        browsers: [
          {browserName: 'firefox'}
          //{
          //  browserName: 'chrome'
          //}
        ]
      }
    }
  })
}
