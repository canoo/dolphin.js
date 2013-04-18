module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),

            requirejs: {
                compile: {
                    options: {
                        // main file to start to look for its dependencies.
                        name          : 'Dolphin',
                        baseUrl       : "src/",
                        mainConfigFile: "config.js",
//                        optimize      : "uglify",
                        out           : "build/<%= pkg.bundle %>.min.js"
                    }
                }
            },

            buster: {
                test  : {
                    config     : 'test/buster.js',
//                    reporter   : 'xml',
                    'log-level': 'debug'
                },
                server: {
                    port: 1111
                }
            },

            jshint: {
                options: {
                    curly  : true,
                    eqeqeq : true,
                    immed  : true,
                    latedef: true,
                    newcap : true,
                    noarg  : true,
                    sub    : true,
                    undef  : true,
                    boss   : true,
                    eqnull : true,
                    node   : true
                },
                globals: {
                    exports: true,
                    $      : true
                }
            },

            clean: {
                build: [
                    'build/'
                ]
            }

        }
    );

    grunt.loadNpmTasks('grunt-contrib');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-buster');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    // Default task.
    grunt.registerTask('test', 'buster');
    grunt.registerTask('default', 'build'.split(' '));
    grunt.registerTask('build', 'clean requirejs'.split(' '));
};
