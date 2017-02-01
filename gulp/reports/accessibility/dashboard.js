'use strict';

const path = require('path'),
  fs = require('fs'),
  _ = require('lodash'),
  handlebars = require('handlebars'),
  options = require('../../utils/profile').getOptions(),
  domain = options.serverUrl.substring(0, options.serverUrl.length - 1);

function readData(cb) {
  fs.readFile(path.join('report', 'pally', 'pallyreport.json'), 'utf8', (err, source) => {
    cb(JSON.parse(source));
  });
}

function transformModel(data) {
  let model = {summary: []},
  index = 0;
  _.each(_.groupBy(data, 'url'), (item, key) => {
    let typesCount = _.countBy(item, 'type'),
      groupedByType = _.groupBy(item, 'type');
    model.summary.push({
      index: index,
      url: key.replace(domain, ''),
      errors: typesCount.error || 0,
      notices: typesCount.notice || 0,
      warnings: typesCount.warning || 0,
      errorList: groupedByType.error,
      noticeList: groupedByType.notice,
      warningList: groupedByType.warning
    });

    index++;
    });
  model.summary = _.sortBy(model.summary, 'url');
  return model;
}

module.exports = function (cb) {
  readData((data) => {
    let model = transformModel(data);
    fs.readFile(path.join('gulp', 'reports', 'accessibility', 'dashboard-template.html'), 'utf8', (err, source) => {
      let template = handlebars.compile(source, {}),
        html = template(model);
      fs.writeFile(path.join('report', 'pally', 'dashboard.html'), html, cb);
    });
  });
};
