'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    meta: {
      public: 'public',
      config: 'config',
      dist: 'dist',
      bower: '<%= meta.public %>/bower_components',
      less: '<%= meta.public %>/less',
      css: '<%= meta.public %>/css',
      js: '<%= meta.public %>/js',
    },
    browserify: {
      build: {
        files: {
          '<%= meta.js %>/main.js': '<%= meta.js %>/app.js'
        }
      }
    },
    clean: {
      build: ['<%= meta.js %>/main.js', '<%= meta.js %>/libs.js', '<%= meta.css %>'],
      dist: ['<%= clean.build %>', '<%= meta.dist %>']
    },
    concat: {
      options: {
        separator: ';',
        stripBanners: true
      },
      bundle: {
        files: {
          '<%= meta.js %>/libs.js': [
            '<%= meta.bower %>/jquery/dist/jquery.js',
            '<%= meta.bower %>/handlebars/handlebars.js',
            '<%= meta.bower %>/ember/ember.js'
          ]
        }
      }
    },
    concurrent: {
      dev: {
        tasks: ['dev', 'watch', 'nodemon'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    copy: {
      dist: {
        expand: true,
        src: ['app.js', 'users.js', 'package.json', '<%= meta.public %>/index.html', '<%= meta.config %>/**/*', '<%= meta.css %>/**/*', '<%= meta.js %>/libs.js', '<%= meta.js %>/main.js'],
        dest: '<%= meta.dist %>/'
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      dev: {
        src: ['<%= meta.js %>/**/*.js', '!<%= meta.js %>/main.js', '!<%= meta.js %>/libs.js']
      }
    },
    less: {
      dev: {
        options: {
          paths: [
            '<%= meta.less %>'
          ]
        },
        files: {
          '<%= meta.css %>/styles.css': '<%= meta.less %>/styles.less'
        }
      },
      dist: {
        options: {
          paths: [
            '<%= meta.less %>'
          ],
          compress: false,
          optimization: 2,
          sourceMap: true,
          sourceMapFilename: '<%= meta.css %>/styles.css.map',
          sourceMapBasepath: '<%= meta.css %>/'
        },
        files: {
          '<%= meta.css %>/styles.css': '<%= meta.less %>/styles.less'
        }
      }
    },
    nodemon: {
      dev: {
        script: 'app.js'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      less: {
        files: ['<%= meta.less %>/**/*.less'],
        tasks: ['less:dev'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['<%= jshint.dev.src %>', '<%= meta.public %>/**/*.html'],
        tasks: ['jshint:dev', 'browserify:build'],
        options: {
          livereload: true
        }
      }
    }
  });

  // Load Grunt tasks.
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');

  // Local tasks.
  grunt.registerTask('default', ['concurrent:dev']);
  grunt.registerTask('dev', ['clean:build', 'concat', 'browserify:build', 'less:dev']);
  grunt.registerTask('dist', ['dev', 'copy:dist']);
};
