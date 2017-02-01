'use strict';

const pa11y = require('pa11y'),
  async = require('async'),
  _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  //server = require('../../utils/server'),
  pa11yOptions = require('./pa11y-options'),
  xlsxTemplate = require('xlsx-template'),
  options = require('../../utils/profile').getOptions(),
  domain = options.serverUrl.substring(0, options.serverUrl.length - 1),
  baseReportPath = path.join('.', 'report', 'pally');

function readStates(callback) {
  let states = path.join('.', 'report', 'states.json');
  fs.exists(states, (exists) => {
    fs.readFile(states, 'utf8', (err, data) => {
      callback(JSON.parse(data));
    });
  });
}

function writeCSV(results, callback) {
  const SEPARATOR = ',',
    EOL = '\r\n',
    HEADERS = [
      'Url', 'Context', 'Type', 'Code', 'Message'
    ];

  let csv = [];

  csv.push(HEADERS.join(SEPARATOR));

  results.forEach((result) => {
    csv.push([
      result.url || '',
      (result.context) ? result.context.replace(/[,\n]/mg, ' ') : '',
      result.type || '',
      (result.code) ? ('\"' + result.code + '\"')  : '',
      (result.message) ? result.message.replace(/[,\n]/mg, ' ') : ''
    ].join(SEPARATOR));
  });

  fs.writeFile(path.join(baseReportPath, 'pallyreport.csv'), csv.join(EOL), callback);
}

function writeJSON(results, callback) {
  fs.writeFile(path.join(baseReportPath, 'pallyreport.json'), JSON.stringify(results, null, 4), callback);
}

function writeXLSX(results, callback) {
  let xlsxValues = [];

  results.forEach((result) => {
    xlsxValues.push({
      url: result.url || '',
      context: result.context ? result.context.replace(/[,\n]/mg, ' ') : '',
      type: result.type || '',
      code: result.code ? ('\"' + result.code + '\"')  : '',
      message: result.message ? result.message.replace(/[,\n]/mg, ' ') : ''
    });
  });

  fs.readFile(path.join('.', 'gulp', 'reports', 'accessibility', 'template.xlsx'), (err, data) => {
    let template = new xlsxTemplate(data),
      sheetNumber = 1,
      values = {
        report: xlsxValues
      };

    template.substitute(sheetNumber, values);
    fs.writeFile(path.join('report', 'pally', 'pallyreport.xlsx'), template.generate(), 'binary', callback);
  });
}

//server(9003, (onComplete) => {
readStates((sitemap) => {
  let test = pa11y(pa11yOptions),
    aggregateResults = [];

  async.mapSeries(sitemap, (page, callback) => {
    let url = domain + page.url;

    if (page.abstract) {
      callback(null, []);
    } else {
      test.run(url, (err, results) => {
        _.each(results, (result) => {
          result.url = url;
        });
        callback(err, results);
      });
    }
  }, (err, results) => {
    results = _.flatten(results);
    async.parallel([
      _.partial(writeCSV, results),
      _.partial(writeJSON, results),
      _.partial(writeXLSX, results)
    ], (err) => {});
  });
});
//});
