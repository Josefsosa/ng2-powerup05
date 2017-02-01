'use strict';

const gulp = require('gulp');

gulp.task('html-validator', function (cb) {
  const validator = require('gulp-html-validator');
  gulp.src('./src/**/*.html')
    .pipe(validator())
    .pipe(gulp.dest('./report/html-validator/json'))
    .on('end', cb);
});

gulp.task('html-validator-report', ['html-validator'], function (cb) {
  const report = require('./html-validator/report');
  report(cb);
});
