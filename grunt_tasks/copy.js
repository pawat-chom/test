module.exports = function (grunt) {

  var path = require('path');
  var fs = require('fs');
  var _ = require('underscore');


  grunt.config.set('copy', {
    less: {
      files: [{
        expand: true,
        dot: true,
        cwd: '.tmp/css',
        dest: '<%= config.build %>/css',
        src: [
          'main.css'
        ]
      }]
    },
    build: {
      files: [{
        expand: true,
        dot: true,
        cwd: '<%= config.app %>',
        dest: '<%= config.deploy %>',
        src: [
          '*.{ico,png,txt}',
          // '.htaccess',
          'css/**/*.*',
          'fonts/**/*.*',
          'images/sprites/icon-*.png',
          // 'data/**/*.*',
          // 'partials/**/*.*',
          // 'index.html',
          'bower_components/requirejs/require.js'
        ]
      }]
    },
    deploy: {
      files: [{
        src: 'www/deploy.html',
        dest: 'deploy/index.html'
      }]
    },
    deploy2: {
      files: [{
        src: 'www/bower_components/requirejs/require.js',
        dest: 'deploy/require.js'
      }]
    },
    deployassets: {
      files: [{
        expand: true,
        dot: true,
        cwd: '<%= config.app %>',
        dest: '<%= config.deploy %>',
        src: [
          'fonts/**/*.*',
          'css/**/*.*'
        ]
      }]
    }
  })
}

