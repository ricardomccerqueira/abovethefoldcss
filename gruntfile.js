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
    coffee: {
      compile: {
        options: {
          bare: true
        },
        files: {
          'src/js/parser.js': ['src/coffee/*.coffee']
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'www/assets/js/parser.js': 'src/js/parser.js'
        }
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
      coffee: {
        files: 'src/coffee/**/*.coffee',
        tasks: 'coffee'
      },
      js: {
        files: ['src/js/*.js'],
        tasks: 'uglify'
      },
      css: {
        files: 'src/sass/**/*.sass',
        tasks: ['haml', 'compass', 'abovethefoldcss']
      },
      htmlcompressor: {
        files: 'src/html/*',
        tasks: 'htmlcompressor'
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-abovethefoldcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-haml');
  grunt.loadNpmTasks('grunt-htmlcompressor');

  grunt.registerTask('default', ['watch']);
};


