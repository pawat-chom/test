module.exports = function (grunt) {

  var path = require('path');
  var fs = require('fs');
  var _ = require('underscore');

  var sprite = require('node-sprite');

  grunt.registerTask('sprite', 'Simple sprite generation', function () {

    var basePath = path.resolve(grunt.config('sprites.sourcePath'));
    var isRetina = grunt.config('sprites.retina');

    var done = this.async();

    sprite.sprites({path: basePath}, function (err, result) {
      if (!err) {


        _.each(result, function (pack, e) {

          var spriteStr = "// ========  This file was generated automaticly, so don't modify it! ========== \n";
          spriteStr += "// =============================================================================== \n";

          spriteStr += ".new-" + pack.name + "{\n";
          spriteStr += '\tbackground: url("' + grunt.config('sprites.webPath') + pack.filename() + '") no-repeat 0 0;\n';
          spriteStr += '\tdisplay: inline-block;\n';
          spriteStr += "}\n";

          _.each(pack.images, function (file) {
            spriteStr += ".icon-" + file.name + "{";
            spriteStr += "\n";
            spriteStr += "\t&:extend(.new-" + pack.name + ");\n";

            if (isRetina && e != 'not-retina') {
              spriteStr += "\twidth: " + parseInt(file.width / 2, 10) + "px;\n";
              spriteStr += "\theight: " + parseInt(file.height / 2, 10) + "px;\n";

              spriteStr += "\tbackground-size: " + parseInt(pack.mapper.width / 2, 10) + "px auto;\n";
              spriteStr += "\tbackground-position: " + parseInt((-file.positionX / 2)) + "px " + parseInt((-file.positionY / 2)) + "px;\n";
            } else {
              spriteStr += "\twidth: " + file.width + "px;\n";
              spriteStr += "\theight: " + file.height + "px;\n";

              spriteStr += "\tbackground-size: " + (pack.mapper.width + "px auto;\n");
              spriteStr += "\tbackground-position: " + (-file.positionX) + "px " + (-file.positionY) + "px;\n";
            }

            spriteStr += "}\n";
          });


          fs.writeFile(path.resolve(grunt.config('sprites.stylPath.' + e)), spriteStr, function () {
            if (err) throw err;
            grunt.log.subhead('File Sprite');
            grunt.log.ok('File ' + grunt.config('sprites.stylPath.icon').toString() + ' was updated');
            done(true);
          });
        });

      }

    });
    //
    //		sprite.sprite('global', {path: './images'}, function(err, globalSprite) {
    //			console.log(globalSprite.filename())
    //			console.log('foo', globalSprite.image('foo'));
    //			console.log('bar', globalSprite.image('bar'));
    //		});

  })



  grunt.config.set('sprites', {
    sourcePath: "src/images/sprites/",
    webPath: "/images/sprites/",
    stylPath: {
      icon: "src/less/_sprite.less",
      'not-retina': "src/less/_sprite-not-retina.less"
    },
    retina: true
  })
};