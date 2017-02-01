'use strict';

const path = require('path'),
  fs = require('fs'),
  _ = require('lodash'),
  handlebars = require('handlebars');

function readData(cb) {
  fs.readFile(path.join('.', 'report', 'tslint', 'tslint.json'), 'utf8', (err, data) => {
    let report = JSON.parse('{"errors":[' + data.replace(/\]\[/g, '],[') + ']}');
    report.errors = _.flatten(report.errors);
    cb(report);
  });
}

function transformModel(data) {
  _.each(data.errors, function (error, index) {
    error.index = index + 1;
    });
  data.total = data.errors.length;
  return data;
}

module.exports = function (cb) {
  readData((data) => {
    let model = transformModel(data);
    fs.readFile(path.join('gulp', 'reports', 'tslint', 'template.html'), 'utf8', (err, source) => {
      let template = handlebars.compile(source, {}),
        html = template(model);
      fs.writeFile(path.join('report', 'tslint', 'report.html'), html, () => {
        cb();
      });
    });
  });
};
