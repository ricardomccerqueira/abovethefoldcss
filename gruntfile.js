module.exports = function(grunt) {
  grunt.file.setBase('./');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    abovethefoldcss: {
      options: {
        css: 'www/assets/css/main.css',
        aboveTheFold: 'www/index.html'
      },
      build: {
      }
    },
    compass: {
      dev: {
        options: {
          config: 'config.rb',
          environment: 'development',
          force: true
        }
      },
      production: {
        options: {
          config: 'config.rb',
          environment: 'production',
          cssDir: 'www/assets/css/',
          force: true
        }
      }
    },
    haml: {
      app: {
        files: {
            "www/index.html": "src/haml/index.html.haml"
        },
        options: {
            templatize: false
        }
      }
    },
    watch: {
      options: {
        livereload: true,
        event: 'all'
      },
      hamlsrc: {
        files: ['src/haml/**/*.haml'],
        tasks: ['haml', 'compass', 'abovethefoldcss']
      },
      css: {
        files: 'src/sass/**/*.sass',
        tasks: ['haml', 'compass', 'abovethefoldcss']
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-abovethefoldcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-haml');

  grunt.registerTask('default', ['watch']);
};


