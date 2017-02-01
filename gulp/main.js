'use strict';

const gulp = require('gulp');

gulp.task('serve', ['webpack-dev-server']);

gulp.task('build', ['clean:all', 'webpack']);

gulp.task('build:dev', ['clean:all', 'webpack:dev']);

gulp.task('dist', ['webpack']);

gulp.task('default', ['serve']);
