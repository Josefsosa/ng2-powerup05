'use strict';

const path = require('path'),
  fs = require('fs'),
  _ = require('lodash'),
  handlebars = require('handlebars');

function getDuplicatedErrors() {
  return JSON.parse(fs.readFileSync('./report/duplicate/jscpd-report.json'));
}

function readData(cb) {
  fs.readFile('./report/duplicate/jscpd-report.json', 'utf8', (err, data) => {
    cb(JSON.parse(data));
  });
}

function transformModel(data) {
  let firstFileNameArray,
    secondFileNameArray;
  if (data.statistics.duplications > 0) {
    _.each(data.duplicates, function (duplicate, index) {
      duplicate.index = index + 1;
      // First file Name
      firstFileNameArray = duplicate.firstFile.name.split('src\\');
      duplicate.firstFile.name = 'src\\' + firstFileNameArray[1];
      // Second file Name
      secondFileNameArray = duplicate.secondFile.name.split('src\\');
      duplicate.secondFile.name = 'src\\' + secondFileNameArray[1];
    });
    data.statistics.table = true;
  } else {
    data.statistics.table = false;
  }
  return data;
}

module.exports = function (cb) {
  readData((data) => {
    let model = transformModel(data);
    fs.readFile(path.join('gulp', 'reports', 'duplicate', 'template.html'), 'utf8', (err, source) => {
      let template = handlebars.compile(source, {}),
        html = template(model);
      fs.writeFile(path.join('report', 'duplicate', 'report.html'), html, () => {
        cb();
      });
    });
  });
};
