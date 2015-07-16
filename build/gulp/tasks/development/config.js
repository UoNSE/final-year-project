var dest = './target';
var src = './src';

module.exports = {
    debug:false,
    browserSync: {
        server: {
            baseDir: [dest, src]
        },
        files: [
            dest + '/**'
        ]
    },
    fontIcons: {
        src: src + "/resources/less/font-icons/**",
        dest: dest + '/font-icons'
    },
    less: {
        src: src + '/less/**.less',
        watch: [src + '/less/**'],
        dest: dest + '/css/'
    },
    markup: {
        src: src + "/resources/**",
        dest: dest
    },
    browserify: {
        debug: true,
        extensions: '.js',
        bundleConfigs: [{
            entries: [src + '/app/main.js'],
            dest: dest + '/js/',
            outputName: 'main.js'
        }]
    }
};