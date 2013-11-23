/*jslint node: true */
'use strict';

module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        express: {
            options: {
              // Override defaults here
            },
            dev: {
                options: {
                    script: 'index.js'
                }
            },
            prod: {
                options: {
                    script: 'index.js',
                    node_env: 'production'
                }
            }
        },
        watch: {
            express: {
                files:  [ '**/*.js' ],
                tasks:  [ 'express:dev' ],
                options: {
                    nospawn: true //Without this option specified express won't be reloaded
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');

    // Default task.
    grunt.registerTask('default', ['express:dev', 'watch']);

};
