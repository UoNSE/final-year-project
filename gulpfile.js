'use strict';

var bs = require('browser-sync');
var gulp = require('gulp');
var less = require('gulp-less');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');

var paths = {
    client: ['src/app/*.js', 'src/app/**/*.js'],
    styles: ['src/resources/css']
};

/**
 * Compiles .less files.
 */
gulp.task('less', function () {
    return gulp.src('src/resources/css/*.less')
        .pipe(less())
        .pipe(gulp.dest('src/resources/css/'));
});

/**
 * Performs a JSHint code evaluation.
 */
gulp.task('lint', function () {
    return gulp.src('./src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

/**
 * Serves our Node server.
 */
gulp.task('serve', function () {
    nodemon({script: 'app.js', ignore: 'node_modules/**/*.js'});
});

/**
 * Task:
 * - initiates 'serve' and reloads changes.
 * - bundles above tasks.
 */
gulp.task('start', ['serve', 'less', 'lint'], function () {
    bs({
        notify: true,
        injectChanges: true
    });
});

/**
 * Default startup task.
 */
gulp.task('default', ['start']);