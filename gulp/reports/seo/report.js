'use strict';

const path = require('path'),
  fs = require('fs'),
  _ = require('lodash'),
  handlebars = require('handlebars');

function readData(cb) {
  fs.readFile('./report/seo/report.json', 'utf8', (err, data) => {
    cb(JSON.parse(data));
  });
}

function transformModel(data) {
  _.each(data.pages, function (page, index) {
    page.index = index + 1;
    });
  data.total = data.pages.length;
  data.table = (data.pages.length > 0) ? true : false;
  return data;
}

module.exports = function (cb) {
  readData((data) => {
    let model = transformModel(data);
    fs.readFile(path.join('gulp', 'reports', 'seo', 'template.html'), 'utf8', (err, source) => {
      let template = handlebars.compile(source, {}),
        html = template(model);
      fs.writeFile(path.join('report', 'seo', 'report.html'), html, () => {
        cb();
      });
    });
  });
};
