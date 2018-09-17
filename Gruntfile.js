module.exports = function(grunt) {
    var rewrite = require('connect-modrewrite');
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: 'frontEnd',
                    keepalive: true,
                    // http://danburzo.ro/grunt/chapters/server/
                    middleware: function(connect, options, middlewares) {
                        // 1. mod-rewrite behavior
                        var rules = [
                            '!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ /index.html'
                        ];
                        middlewares.unshift(rewrite(rules));
                        return middlewares;
                    },
                    open: {
                        target: 'http://localhost:9000',
                        app: 'Google Chrome'
                    }
                }
            }

        }
    });
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('default', ['connect']);
};