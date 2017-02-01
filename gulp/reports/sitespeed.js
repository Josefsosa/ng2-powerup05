const gulp = require('gulp');

gulp.task('sitespeed', ['server:reports'], (cb) => {
  const sitespeedio = require('gulp-sitespeedio'),
    options = require('../utils/profile').getOptions();

  sitespeedio({
    url: options.serverUrl,
    deepth: 2,
    resultBaseDir: './report/sitespeed',
    browser: 'headless',
    connection: 'desktop',
    no: 3,
    showFailedOnly: true,
    html: true
  })(cb);
});
