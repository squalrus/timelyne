(function () {

    "use strict";

    module.exports = function (grunt) {

        // Project Configuration
        grunt.initConfig({
            pkg: grunt.file.readJSON("package.json"),

            // Uglify JS
            uglify: {
                options: {
                    mangle: true
                },
                dist: {
                    files: {
                        "public/js/timelyne.min.js" : ["lib/timelyne.js"],
                        "public/js/basic.min.js" : ["lib/basic.js"]
                    }
                }
            },

            // Compile LESS
            less: {
                development: {
                    options: {
                        compress: true
                    },
                    files: {
                        "public/css/timelyne.min.css": "theme/timelyne.less",
                        "public/css/basic.min.css": "theme/basic.less"
                    }
                }
            },

            // Linting Files / Directories
            jshint: {
                all: ["Gruntfile.js", "lib/*.js"],
                options: {
                    laxcomma: false,
                    eqeqeq: true,
                    quotmark: "double",
                    unused: true,
                    strict: true,
                    trailing: true,
                    indent: 4
                }
            },

            // Watch Directories / Files
            watch: {
                files: ["Gruntfile.js", "server.js", "lib/*.js", "theme/*.less"],
                tasks: ["default"]
            }
        });

        // Load the plugins
        grunt.loadNpmTasks("grunt-contrib-uglify");
        grunt.loadNpmTasks("grunt-contrib-less");
        grunt.loadNpmTasks("grunt-contrib-jshint");
        grunt.loadNpmTasks("grunt-contrib-watch");

        // Default tasks
        grunt.registerTask("default", ["uglify", "less", "jshint"]);
    };

})();