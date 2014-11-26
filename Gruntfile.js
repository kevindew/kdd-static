/*jshint node:true*/

// Generated on 2014-11-07 using
// generator-jade-preview 0.1.0
'use strict';

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'app',
    preview: 'preview',
    dist: 'dist',
    awsJsonPath: '.aws.json',
    ftpJsonPath: '.ftp.json'
  };

  var aws = {};
  if (grunt.file.exists(config.awsJsonPath)) {
    aws = grunt.file.readJSON(config.awsJsonPath);
  } else {
    grunt.log.warn(
      ('Warning - you don\'t have a ' + config.awsJsonPath + ' file, please generate one by running `grunt generate:awsJson`').yellow
    );
  }

  if (!grunt.file.exists(config.ftpJsonPath)) {
    grunt.log.warn(
      ('Warning - you don\'t have a ' + config.ftpJsonPath + ' file, please generate one by running `grunt generate:ftpJson`').yellow
    );
  }

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      jade: {
        files: ['<%= config.app %>/**/*.jade'],
        tasks: ['jade']
      },
      coffee: {
        files: ['<%= config.app %>/scripts/**/*.{coffee,litcoffee,coffee.md}'],
        tasks: ['coffee:dist']
      },
      js: {
        files: ['<%= config.app %>/scripts/**/*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: ['<%= config.app %>/styles/**/*.{scss,sass}'],
        tasks: ['sass:server', 'autoprefixer']
      },
      styles: {
        files: ['<%= config.app %>/styles/**/*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '.tmp/**/*.html',
          '.tmp/styles/**/*.css',
          '.tmp/scripts/**/*.js',
          '<%= config.app %>/images/**/*'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 6969,
        open: true,
        livereload: 35730,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      preview: {
        options: {
          base: config.preview,
          livereload: false
        }
      },
      dist: {
        options: {
          base: config.dist,
          livereload: false
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      preview: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.preview %>/*',
            '!<%= config.preview %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    jade: {
      dist: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.app %>',
          dest: '.tmp',
          src: [
            '**/*.jade',
            '!**/_*.jade'
          ],
          ext: '.html'
        }]
      }
    },

    // Compiles CoffeeScript to JavaScript
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/scripts',
          src: '{,*/}*.{coffee,litcoffee,coffee.md}',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        loadPath: 'bower_components'
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '**/*.css',
          dest: '.tmp/styles/'
        }, {
          expand: true,
          cwd: '<%= config.app %>/styles/',
          src: '**/*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/scripts/**/*.js',
            '<%= config.dist %>/styles/**/*.css',
            '<%= config.dist %>/images/**/*.*',
            '<%= config.dist %>/styles/fonts/**/*.*',
            '<%= config.dist %>/bower_components/*/**/*.*',
            '!<%= config.dist %>/bower_components/reveal.js/plugin/notes/*'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: config.dist
      },
      html: '<%= config.dist %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          config.dist,
          '<%= config.dist %>/images',
          '<%= config.dist %>/styles'
        ]
      },
      html: ['<%= config.dist %>/**/*.html'],
      css: ['<%= config.dist %>/styles/**/*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '**/*.{gif,jpeg,jpg,png}',
          dest: '.tmp/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '**/*.svg',
          dest: '.tmp/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: config.dist,
          src: '**/*.html',
          dest: config.dist
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= config.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/scripts/scripts.js': [
    //         '<%= config.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: config.app,
          dest: config.dist,
          src: [
            '*.{ico,png,txt}',
            'images/**/*.webp',
            'styles/fonts/**/*.{eot,woff,woff2,svg,ttf}'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: '.tmp',
          dest: config.dist,
          src: 'images/**/*.{gif,jpeg,jpg,png,svg}'
        }, {
          expand: true,
          dot: true,
          cwd: '.',
          dest: config.dist,
          src: [
            'bower_components/**/*.{eot,woff,woff2,svg,ttf,gif,jpeg,jpg,png}',
            '!bower_components/twemoji/**/*.{png,svg}',
            'bower_components/reveal.js/plugin/notes/*'
          ]
        }]
      },
      distHtml: {
        files: [{
          expand: true,
          dot: true,
          cwd: '.tmp',
          dest: config.dist,
          src: '**/*.html'
        }, {
          expand: true,
          dot: true,
          cwd: config.app,
          dest: config.dist,
          src: '**/*.html'
        }]
      },
      preview: {
        files: [{
          expand: true,
          dot: true,
          cwd: config.app,
          dest: config.preview,
          src: [
            '*.{ico,png,txt}',
            'images/**/*.webp',
            '**/*.html',
            'styles/fonts/**/*.{eot,woff,woff2,svg,ttf}',
            'scripts/**/*.js'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: '.tmp',
          dest: config.preview,
          src: [
            'images/**/*.{gif,jpeg,jpg,png,svg}',
            '**/*.html',
            'styles/**/*.css',
            'scripts/**/*.js'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: '.',
          dest: config.preview,
          src: [
            'bower_components/**/*',
            '!bower_components/twemoji/{16x16,36x36,72x72,assets,svg}/*',
            '!bower_components/modernizr/media/*'
          ]
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '**/*.css'
      }
    },

    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      dist: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: '<%= config.dist %>/scripts/vendor/modernizr.js',
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '!<%= config.dist %>/scripts/vendor/*'
          ]
        },
        uglify: true
      }
    },

    aws_s3: {
      options: {
        accessKeyId: aws.AWSAccessKeyId, // Use the variables
        secretAccessKey: aws.AWSSecretKey, // You can also use env variables
        region: 'eu-west-1', // change this if you have a different region
        uploadConcurrency: 5, // 5 simultaneous uploads
        downloadConcurrency: 5 // 5 simultaneous downloads
      },
      preview: {
        options: {
          bucket: 'kdd-static-preview'
        },
        files: [{
          expand: true,
          cwd: config.preview,
          src: '**',
          dest: ''
        }]
      },
      cleanPreview: {
        options: {
          bucket: 'kdd-static-preview'
        },
        files: [{
          dest: '/',
          action: 'delete'
        }]
      },
      dist: {
        options: {
          bucket: 'kdd-static.kevindew.me'
        },
        files: [{
          expand: true,
          cwd: config.dist,
          src: [
            'scripts/**/*.js',
            'styles/**/*.css',
            'images/**/*.*',
            'styles/fonts/**/*.*',
            'bower_components/**/*.{eot,woff,woff2,svg,ttf,gif,jgp,jpeg,png}'
          ],
          dest: '',
          params: {
            CacheControl: 'max-age=' + (60 * 60 * 24 * 28).toString()
          }
        },{
          expand: true,
          cwd: '<%= config.dist %>',
          src: [
            '**',
            '!scripts/**/*.js',
            '!styles/**/*.css',
            '!images/**/*.*',
            '!styles/fonts/**/*.*',
            '!bower_components/**/*.{eot,woff,woff2,svg,ttf,gif,jgp,jpeg,png}'
          ],
          dest: '',
          params: {
            CacheControl: 'max-age=60'
          }
        }]
      },
      cleanDist: {
        options: {
          bucket: 'kdd-static'
        },
        files: [{
          dest: '/',
          action: 'delete'
        }]
      }
    },

    'ftp-deploy': {
      preview: {
        auth: {
          host: 'rb-dev.co.uk',
          port: 21,
          authPath: config.ftpJsonPath,
          authKey: 'preview'
        },
        src: config.preview,
        dest: 'kdd-preview'
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'coffee:dist',
        'sass:server',
        'copy:styles'
      ],
      preview: [
        'coffee',
        'sass',
        'copy:styles',
        'imagemin',
        'svgmin'
      ],
      dist: [
        'coffee',
        'sass',
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    }
  });


  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'preview') {
      return grunt.task.run(['build:preview', 'connect:preview:keepalive']);
    }
    if (target === 'dist') {
      return grunt.task.run(['build:dist', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'jade',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('build', function(target) {

    if (target === 'preview') {
      return grunt.task.run([
        'clean:preview',
        'jade',
        'concurrent:preview',
        'autoprefixer',
        'copy:preview'
      ]);
    }

    grunt.task.run([
      'clean:dist',
      'jade',
      'copy:distHtml',
      'useminPrepare',
      'concurrent:dist',
      'autoprefixer',
      'concat',
      'cssmin',
      'uglify',
      'copy:dist',
      'modernizr',
      'rev',
      'usemin',
      'htmlmin'
    ]);
  });

  grunt.registerTask('default', [
    'newer:jshint',
    'build:preview',
    'build:dist'
  ]);

  grunt.registerTask('s3Deploy', function(target) {
    if (target === 'preview') {
      return grunt.task.run(
        'build:preview',
        'aws_s3:cleanPreview',
        'aws_s3:preview'
      );
    }
    grunt.task.run(
      'build:dist',
      'aws_s3:cleanDist',
      'aws_s3:dist'
    );
  });

  grunt.registerTask('ftpDeploy', function(target) {
    if (target === 'preview') {
      return grunt.task.run(
        'build:preview',
        'ftp-deploy:preview'
      );
    }
    grunt.task.run(
      'build:dist',
      'ftp-deploy:dist'
    );
  });

  grunt.registerTask('generate', function(target) {
    if (target === 'awsJson') {
      if (grunt.file.exists(config.awsJsonPath)) {
        return grunt.log.error(
          ('There\'s already a file of ' + config.awsJsonPath + ' please delete or rename this if you want to re-run this generator').red
        );
      }
      grunt.file.write(config.awsJsonPath, JSON.stringify({
        AWSAccessKeyId: 'Your AWS Access Key Id',
        AWSSecretKey: 'Your AWS Secret Key'
      }, null, 2));
      return grunt.log.writeln().success('File created. Please update the credentials in ' + config.awsJsonPath);
    }

    if (target === 'ftpJson') {
      if (grunt.file.exists(config.ftpJsonPath)) {
        return grunt.log.error(
          ('There\'s already a file of ' + config.ftpJsonPath + ' please delete or rename this if you want to re-run this generator').red
        );
      }
      var data = {}
      for (var key in grunt.config.data['ftp-deploy']) {
        data[key] = {
          username: 'Your username',
          password: 'Your password'
        }
      }
      grunt.file.write(config.ftpJsonPath, JSON.stringify(data, null, 2));
      return grunt.log.writeln().success('File created. Please update the credentials in ' + config.ftpJsonPath);
    }
  });
};
