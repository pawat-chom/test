module.exports = function (grunt) {

  var path = require('path');
  var fs = require('fs');
  var _ = require('underscore');


  grunt.config.set('jshint', {
    options: {
      jshintrc: '.jshintrc'
    },
    all: [
      '*.js',
      'app/**/*.js',
      '<%= config.app %>/js/data/**/*.js',
      '<%= config.app %>/js/fame/**/*.js',
      '<%= config.app %>/js/specs/**/*.js',
      '<%= config.app %>/test/**/*.js',
      'tests/**/*.js'
    ]
  })
}

