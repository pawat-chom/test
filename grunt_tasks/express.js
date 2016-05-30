module.exports = function (grunt) {

  var path = require('path');
  var fs = require('fs');
  var _ = require('underscore');


  grunt.config.set('express', {
    local: {
      options: {
        script: 'server.js',
        node_env: 'local',
        port: 8080
      }
    },
    production: {
      options: {
        script: 'server.js',
        port: 8888
      }
    }
  })
}

