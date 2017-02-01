const gulp  = require('gulp'),
  shell = require('gulp-shell'),
  path = require('path'),
  options = require('../utils/profile').getOptions();

gulp.task('seo', ['generate-states', 'server:reports'], shell.task(
  'phantomjs ' + path.join('.', 'gulp', 'reports', 'seo', 'routes.js') + ' "' + options.serverUrl.substring(0, options.serverUrl.length - 1) + '"'
));

gulp.task('seo-report', ['seo'], function (cb) {
  const report = require('./seo/report');
  report(cb);
});
