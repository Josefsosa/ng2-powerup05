'use strict';

const gulp = require('gulp'),
  options = require('./utils/profile').getOptions();

gulp.task('sitemap', ['webpack'], function () {
  const sitemap = require('gulp-sitemap');

  gulp.src('./dist/**/*.{html,js,css,jpg,gif,png,svg,woff,ttf,eot}')
    .pipe(sitemap({
      siteUrl: options.serverUrl,
      changefreq: 'weekly',
      lastMod: Date.now(),
      priority : '1.0',
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sitemap-json', function (cb) {
  const json = require('./sitemap/json');
  json(options.serverUrl, cb);
});