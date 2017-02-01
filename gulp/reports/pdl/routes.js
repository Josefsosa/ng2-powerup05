'use strict';

var fs = require('fs'),
  system = require('system'),
  async = require('async'),
  _ = require('lodash'),
  args = system.args,
  domain = args[1],
  outputJson = './report/pdl/report.json',
  outputCsv = './report/pdl/report.csv',
  mapping = require('./mapping.json'),
  webpage = require('webpage'),
  page = webpage.create();

function getPageData() {

  return page.evaluate(function (mapping) {
    var digitalDataObj = {};
    _.each(mapping, function (path, key) {
      digitalDataObj[key] =  _.get(window.digitalData, path, '');
    });
    return digitalDataObj;
  }, mapping);
}

function convertToCSV(json) {
  var fields = Object.keys(json[0]);
  var csv = json.map(function (row) {
    return fields.map(function (fieldName) {
      return JSON.stringify(row[fieldName] || '');
    });
  });
  csv.unshift(fields);
  return csv.join('\r\n');
}

function run() {
  var states = _.reject(require('../../../report/states.json'), 'abstract', true);

  async.mapSeries(states, function (state, callback) {
    var pageData = {
      url: domain + state.url,
      urlPath: state.url
    };

    page.open(pageData.url, function (status) {
      setTimeout(function () {
        _.assign(pageData, getPageData());
        callback(null, pageData);
      }, 1000);
    });

  }, function (err, pages) {
    var jsonReport = JSON.stringify({
      pages: _.orderBy(pages, 'url')
    }, null, 4);
    fs.write(outputJson, jsonReport, 'w');
    var csvString = convertToCSV(pages);
    fs.write(outputCsv, csvString, 'w');
    phantom.exit();
  });
}

run();
