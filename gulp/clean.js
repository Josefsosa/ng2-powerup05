'use strict';

const gulp = require('gulp');

gulp.task('clean', function () {
  const del = require('del');
  return del([
    './dist'
  ]);
});

gulp.task('clean:all', function () {
  const del = require('del');
  return del([
    './dist',
    './report',
    './out',
    './.tmp'
  ]);
});

gulp.task('clean:temp', function () {
  const del = require('del');
  return del([
    './.tmp'
  ]);
});
