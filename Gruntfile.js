(function() {
    'use strict';

    module.exports = function( grunt ){

        // Project Configuration
        grunt.initConfig({
             pkg: grunt.file.readJSON( 'package.json' )

             // Uglify JS
            ,uglify: {
                 options: {
                    beautify: true
                }
                ,dist: {
                    files: {
                         'public/js/timelyne.min.js' : ['lib/timelyne.js']
                    }
                }
            }

            // Compile LESS
            ,less: {
                development: {
                    options: {
                        compress: true
                    }
                    ,files: {
                         'public/css/timelyne.min.css': 'theme/timelyne.less'
                    }
                }
            }

            // Linting Files / Directories
            ,jshint: {
                all: ['Gruntfile.js', 'lib/*.js']
                ,options: {
                    laxcomma: true,
                    eqeqeq: true,
                    quotmark: 'single',
                    unused: true,
                    strict: true,
                    trailing: true
                }
            }

            // Watch Directories / Files
            ,watch: {
                 files: ['Gruntfile.js', 'lib/*.js', 'theme/*.less']
                ,tasks: ['default']
            }
        });

        // Load the plugins
        grunt.loadNpmTasks( 'grunt-contrib-uglify' );
        grunt.loadNpmTasks( 'grunt-contrib-less' );
        grunt.loadNpmTasks( 'grunt-contrib-jshint' );
        grunt.loadNpmTasks( 'grunt-contrib-watch' );

        // Default tasks
        grunt.registerTask( 'default', ['uglify', 'less', 'jshint'] );
    };

})();