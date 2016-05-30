wmodule.exports = function (grunt) {

  var path = require('path');
  var fs = require('fs');
  var _ = require('underscore');


  grunt.config.set('usemin', {
    options: {
      dirs: ['<%= config.build %>']
    },
    html: ['<%= config.build %>/{,*/}*.html'],
    css: ['<%= config.build %>/css/{,*/}*.css']
  });

  grunt.config.set('svgmin', {
    // build: {
    //   files: [{
    //     expand: true,
    //     cwd: '<%= config.app %>/images',
    //     src: '{,*/}*.svg',
    //     dest: '<%= config.build %>/images'
    //   }]
    // }
  });

  grunt.config.set('useminPrepare', {
    options: {
      dest: '<%= config.build %>'
    },
    html: '<%= config.app %>/index.html'
  });

  grunt.config.set('cssmin', {
    // This task is pre-configured if you do not wish to use Usemin
    // blocks for your CSS. By default, the Usemin block from your
    // `index.html` will take care of minification, e.g.
    //
    //     <!-- build:css({.tmp,app}) css/main.css -->
    //
    // build: {
    //     files: {
    //         '<%= config.build %>/css/main.css': [
    //             '.tmp/css/{,*/}*.css',
    //             '<%= config.app %>/css/{,*/}*.css'
    //         ]
    //     }
    // }
  });

  grunt.config.set('htmlmin', {
    build: {
      options: {
        /*removeCommentsFromCDATA: true,
         // https://github.com/paths/grunt-usemin/issues/44
         //collapseWhitespace: true,
         collapseBooleanAttributes: true,
         removeAttributeQuotes: true,
         removeRedundantAttributes: true,
         useShortDoctype: true,
         removeEmptyAttributes: true,
         removeOptionalTags: true*/
      },
      files: [{
        expand: true,
        cwd: '<%= config.app %>',
        src: '*.html',
        dest: '<%= config.build %>'
      }]
    }
  })
}

