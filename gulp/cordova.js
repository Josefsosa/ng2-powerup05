'use strict';

const gulp = require('gulp'),
    shell = require('gulp-shell'),
    cordovaFolder = 'cordova';

gulp.task('cordova:create', (callback) => {
  let pkg = require('../package.json');

  shell.task([
    'cordova create ' + cordovaFolder + ' ' + pkg.cordova.package + ' ' + pkg.cordova.name
  ], {})(() => {
    shell.task([
      'cordova platform add browser'
    ], {cwd: './' + cordovaFolder})(() => {
      callback();
    });
  });
});

gulp.task('cordova:add:ios', shell.task([
  'cordova platform add ios'
], {cwd: './' + cordovaFolder}));

gulp.task('cordova:add:android', shell.task([
  'cordova platform add android'
], {cwd: './' + cordovaFolder}));

gulp.task('cordova:clean', () => {
  const del = require('del');
  return del([
    './' + cordovaFolder + '/www'
  ]);
});

gulp.task('cordova:copyfiles', ['cordova:clean'], (callback) => {
  gulp.src('**/*', { cwd: 'dist' })
    .pipe(gulp.dest('./' + cordovaFolder + '/www'))
    .on('finish', () => {
        callback();
    });
});

gulp.task('cordova:copy', ['cordova:copyfiles'], () => {
  const injectString = require('gulp-inject-string');
  gulp.src('dist/index.html')
    .pipe(injectString.before('<script',
      `
<script type="text/javascript" src="cordova.js"></script>
<script type="text/javascript" src="cordova_plugins.js"></script>
      `))
    .pipe(injectString.replace('<base href="/">', ''))
    .pipe(gulp.dest(cordovaFolder + '/www'));
});

gulp.task('cordova:build', (callback) => {
  const runSequence = require('run-sequence');
  runSequence('webpack:dev', 'cordova:copy', callback);
});

gulp.task('cordova:build:prod', (callback) => {
  const runSequence = require('run-sequence');
  runSequence('webpack', 'cordova:copy', callback);
});

gulp.task('cordova:run', ['cordova:build'], shell.task([
  'cordova run browser -- --port=9100'
], {cwd: './' + cordovaFolder}));

gulp.task('cordova:run:ios', ['cordova:build'], shell.task([
  'cordova run ios'
], {cwd: './' + cordovaFolder}));

gulp.task('cordova:run:android', ['cordova:build'], shell.task([
  'cordova run android'
], {cwd: './' + cordovaFolder}));

gulp.task('cordova:emulate:ios', ['cordova:build'], shell.task([
  'cordova emulate ios'
], {cwd: './' + cordovaFolder}));

gulp.task('cordova:emulate:android', ['cordova:build'], shell.task([
  'cordova emulate android'
], {cwd: './' + cordovaFolder}));
