module.exports = function (grunt) {

  var path = require('path');
  var fs = require('fs');
  var _ = require('underscore');


  grunt.config.set('less', {
    compile: {
      files: [{
        src: 'www/less/app.less',
        dest: 'www/css/app.css'
      }],
      yuicompress: true
    }
  })
}

