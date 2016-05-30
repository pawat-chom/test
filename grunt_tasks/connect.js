module.exports = function (grunt) {

  var path = require('path');
  var fs = require('fs');
  var _ = require('underscore');


  grunt.config.set('connect', {
    options: {
      port: 8888,
      livereload: 35729,
      // change this to '0.0.0.0' to access the server from outside
      hostname: 'localhost'
    },
    livereload: {
      options: {
        protocol: 'http',
        open: 'http://local.fame500.com:8888/',
        base: [
          '.tmp',
          '<%= config.app %>'
        ]
      }
    },
    test: {
      options: {
        base: [
          '.tmp',
          'src',
          '<%= config.app %>'
        ]
      }
    },
    build: {
      options: {
        protocol: 'http',
        open: 'http://local.fame500.com:8888/',
        base: '<%= config.build %>'
      }
    }
  })
}
