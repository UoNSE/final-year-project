var dest = './production';
var src = './src';

module.exports = {
    debug:false,
    browserSync: {
        server: {
            baseDir: [dest, src]
        },
        port:9000,
        files: [
            dest + '/**'
        ]
    },
    fontIcons: {
        src: src + "/less/font-icons/**",
        dest: dest + '/font-icons'
    },
    less: {
        src: src + '/less/**.less',
        watch: [src + '/less/**'],
        dest: dest + '/css/'
    },
    markup: {
        src: src + "/www/**",
        dest: dest
    },
    browserify: {
        debug: false,
        extensions: [ '.jsx' ],
        bundleConfigs: [{
            entries: src + '/app/Application.jsx',
            dest: dest + '/js/',
            outputName: 'Application.js'
        }]
    }
};