var requireDir = require('require-dir');
var gulp = require('gulp');
var gutil = require('gulp-util');

if(gutil.env.type === 'production') {
    requireDir('./build/gulp/tasks/production', {recurse: true});
} else  {
    requireDir('./build/gulp/tasks/development', {recurse: true});
}
