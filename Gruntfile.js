module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),


            requirejs: {
                compile: {
                    options: {
                        // main file to start to look for its dependencies.
                        name          : 'dolphin',
                        baseUrl       : "src/app",
                        mainConfigFile: "src/config.js",
                        optimize      : "uglify",
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
                    exports: true
                }
            },

            clean: {
                build: [
                    'build/'
                ]
            },

            copy: {
                build: {
                    files: [
                        {
                            expand: true,
                            cwd   : 'src/',
                            dest  : 'build/',

                            src: [
                                "config.json",
                                "config.js",
                                "index.html",
                                "**/*.css",
                                "**/*.png",
                                "**/*.jpg",

                                "**/*.eot",
                                "**/*.svg",
                                "**/*.ttf",
                                "**/*.woff",
                                "**/*.otf",

                                // exclude everything from scripts folder
                                "!scripts/**"
                            ]

                        },
                        {
                            expand: true,
                            cwd   : 'src/',
                            dest  : 'build/',
                            src   : [
                                // include only requijs from scripts folder
                                "scripts/requirejs/require.js"
                            ]

                        }
                    ]
                }

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
