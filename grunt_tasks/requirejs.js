    module.exports = function (grunt) {

  var path = require('path');
  var fs = require('fs');
  var _ = require('underscore');


  grunt.config.set('requirejs', {
    build: {
      // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
      options: {
        out: './www/javascripts/main.min.js',
        name: 'main',
        mainConfigFile: './www/javascripts/main.js',
        baseUrl: '<%= config.app %>/javascripts',
        //optimize: 'none',
        //preserveLicenseComments: false,
        optimize: 'uglify2',
        preserveLicenseComments: false,
        generateSourceMaps: true,
        //useStrict: true,
        //wrap: true
        //uglify2: {} // https://github.com/mishoo/UglifyJS2
      }
    }
  })
}
