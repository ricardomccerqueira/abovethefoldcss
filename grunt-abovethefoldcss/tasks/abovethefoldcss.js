module.exports = function(grunt) {
  grunt.registerMultiTask('abovethefoldcss', 'Split css into above and bellow the fold content', function() {
    
    var fs               = require('fs'),
        done             = this.async(),
        config = {
          cssFile           : this.options().css,
          aboveTheFoldFiles : this.options().aboveTheFold,
          useEmptyStyleTag  : this.options().useEmptyStyleTag || true,
          sassPattern       : this.options().sassPattern || "/*!ABOVE_THE_FOLD */",
          stylePattern      : this.options().stylePattern || "<style datafor='abovethefold'></style>"
        };

    var fileWritter = function(_file) {
      var file = _file

      fs.readFile(file,'utf8', function (err, data) {
        htmlContents = data.replace(config.stylePattern,'<style>'+aboveTheFold+'</style>')

        fs.writeFile(file, htmlContents, function (err) {
          if (err) grunt.log.write( 'ERROR writting' + file + " => " + err);
        });
      });
    }

    var checkAboveFileType = function() {
      if(typeof config.aboveTheFoldFiles == 'string') {
        config.aboveTheFoldFiles = [config.aboveTheFoldFiles]
      }
    }
    
    fs.readFile(config.cssFile,'utf8', function (err, data) {
      if (err) grunt.log.write( 'ERROR reading' + config.cssFile + " => " + err);

      css           = data.split(config.sassPattern);
      aboveTheFold  = '';
      bellowTheFold = data;

      for (var i =0; i < css.length -1; i++) {
        if(i%2 == 1){
          aboveTheFold += css[i];
          bellowTheFold = bellowTheFold.replace(css[i], '').split(config.sassPattern).join('');
        }
      }

      checkAboveFileType();

      if(config.useEmptyStyleTag){
        for(var a = 0; a < config.aboveTheFoldFiles.length; a++ ){
          fileWritter(config.aboveTheFoldFiles[a]);
        }  
      } else {
        fs.writeFile(config.aboveTheFoldFiles[0], aboveTheFold, function (err) {
          if (err) grunt.log.write( 'ERROR writting' + config.aboveTheFoldFiles[0] + " => " + err);
        });
      }
        
      fs.writeFile(config.cssFile, bellowTheFold, function (err) {
        if (err) grunt.log.write( 'ERROR writting' + config.cssFile + " => " + err);
      });

    });
  });
};
