module.exports = function(grunt) {
  grunt.registerMultiTask('abovethefoldcss', 'Split css into above and bellow the fold content', function() {
    
    var fs               = require('fs'),
        done             = this.async();

    var config = {
      cssFile           : this.options().css,
      aboveTheFoldFile  : this.options().aboveTheFold,
      useEmptyStyleTag  : this.options().useEmptyStyleTag || true,
      pattern           : this.options().pattern || "/*!ABOVE_THE_FOLD */"
    };
    
    fs.readFile(config.cssFile,'utf8', function (err, data) {
      if (err) grunt.log.write( 'ERROR reading' + config.cssFile + " => " + err);

      css           = data.split(config.pattern);
      aboveTheFold  = '';
      bellowTheFold = data;

      for (var i =0; i < css.length -1; i++) {
        if(i%2 == 1){
          aboveTheFold += css[i];
          bellowTheFold = bellowTheFold.replace(css[i], '').split(config.pattern).join('');
        }
      }

      if(config.useEmptyStyleTag){
        fs.readFile(config.aboveTheFoldFile,'utf8', function (err, data) {
          htmlContents = data.replace("<style datafor='abovethefold'></style>",'<style>'+aboveTheFold+'</style>')

          fs.writeFile(config.aboveTheFoldFile, htmlContents, function (err) {
            if (err) grunt.log.write( 'ERROR writting' + config.aboveTheFoldFile + " => " + err);
          });
        });  
      } else {
        fs.writeFile(config.aboveTheFoldFile, aboveTheFold, function (err) {
          if (err) grunt.log.write( 'ERROR writting' + config.aboveTheFoldFile + " => " + err);
        });
      }
        
      fs.writeFile(config.cssFile, bellowTheFold, function (err) {
        if (err) grunt.log.write( 'ERROR writting' + config.cssFile + " => " + err);
      });

    });
  });
};
