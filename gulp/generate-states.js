'use strict';

const gulp = require('gulp');
const path = require('path');
const shell = require('gulp-shell');

gulp.task('generate-states', ['server:reports'], (callback) => {
  const present = require('present'),
    clc = require('cli-color'),
    options = require('./utils/profile').getOptions();

  let scriptStartTime = present();
  console.log(clc.green('info: ') + 'Starting state generator script...');

  shell.task([
    'phantomjs ' + path.join('.', 'gulp', 'state-generator', 'generator.js') + ' "' + options.serverUrl + '"'
  ], {})(() => {
    let scriptDuration = Math.round((present() - scriptStartTime) / 10) / 100;
    console.log(clc.green('info: ') + 'Finished state generator script in ' + scriptDuration + ' seconds.');
    callback();
  });
});
