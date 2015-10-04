'use strict';

let gulp = require('gulp');
let plumber = require('gulp-plumber');
let mocha = require('gulp-mocha');
let eslint = require('gulp-eslint');
let istanbul = require('gulp-istanbul');
let complexity = require('gulp-complexity');
let gls = require('gulp-live-server');


gulp.task('serve', () => {
    let server = gls.new('index.js');
    server.start();
    gulp.watch(['apps/**/*.js', 'lib/**/*.js', 'index.js'], () => {
        server.start();
    });
});

gulp.task('pre-unit', () => {
  return gulp.src('apps/**/*.js')
    .pipe(istanbul({includeUntested: true}))
    .pipe(istanbul.hookRequire());
});

gulp.task('unit', ['pre-unit'] ,() => {
    return gulp.src('test/**/*.js')
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});

gulp.task('test', ['unit']);
gulp.task('default', []);
