'use strict';

var _ = require('lodash'),
  async = require('async'),
  fs = require('fs'),
  page = require('webpage').create(),
  system = require('system'),
  args = system.args,
  urls = [
    args[1]
  ];

function wait(fn, repeats, delay, callback) {
  if (repeats > 0) {
    setTimeout(function () {
      var value = fn();
      if (value) {
        callback(value);
      } else {
        wait(fn, repeats - 1, delay, callback);
      }
    }, delay);
  } else {
    callback(null);
  }
}

function getStatesObject() {
  return page.evaluate(function() {
    return window.objStatesGenerator;
  });
}

function openUrl(url, callback) {
  page.open(url, function (status) {
    wait(getStatesObject, 120, 1000, function (states) {
      states = states || [];
      callback(null, states);
    });
  });
}

async.mapSeries(urls, openUrl, function (err, results) {
  results = _.flatten(results);
  fs.write('./report/states.json', JSON.stringify(results, null, 4), 'w');
  phantom.exit();
});
