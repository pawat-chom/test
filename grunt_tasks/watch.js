module.exports = function (grunt) {

  var path = require('path');
  var fs = require('fs');
  var _ = require('underscore');


  grunt.config.set('watch', {
    scripts: {
      files: 'app/**/*.js',
      options: {
        interrupt: true
      }
    },
    stylesheets: {
      files: ['src/less/**/*.*'],
      tasks: ['less'],
      options: {
        interrupt: true
      }
    },
    livereload: {
      //options: {
      //  livereload: '<%= connect.options.livereload %>'
      //},
      files: [
        '<%= config.app %>/*.html',
        '{.tmp,<%= config.app %>}/js/**/*.*',
        '{.tmp,<%= config.app %>}/less/**/*.less', // Add less files to dynamically reload
        'archery/src/less/**/*.{less,css}',
        '{.tmp,<%= config.app %>}/js/**/*.hbs',
        '<%= config.app %>/stylesheets/**/*.*',
        '<%= config.app %>/less/**/*.*'
      ],
      tasks: ['less', 'copy:less']
    }
  })
}

