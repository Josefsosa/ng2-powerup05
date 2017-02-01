'use strict';

const path = require('path'),
  fs = require('fs'),
  _ = require('lodash'),
  handlebars = require('handlebars'),
  DOMParser = require('xmldom').DOMParser;
  
function xmlToJson (serverUrl, xml) {
  let sitemapJson,
    propertyName,
    propertyValue,
    propertyValueIndex,
    nodeString,
    nodeObj,
    nodesArray = [],
    temp;
  if (xml.hasChildNodes()) {
    _.each(xml.childNodes.item(1).childNodes, function(url, index) {
      if (url.nodeName === 'url') {
        nodeString = '{';
        _.each(url.childNodes, function(child, index) {
          if (child.nodeName !== '#text') {
            propertyName = child.nodeName;
            propertyValueIndex =  index;
            _.each(child.childNodes, function (attribute, index) {
              if (propertyName === 'loc') {
                propertyValue = attribute.data.replace(' ', '').replace(serverUrl, '');
              } else if (propertyName === 'lastmod') {
                let date = attribute.data.replace(' ', '').split('T'),
                  arrayDate = date[0].split('-');
                propertyValue = '{"year": "' + arrayDate[0] + '", "month": "' + arrayDate[1] + '", "day": "' + arrayDate[2] + '"}'
              } else {
                propertyValue = attribute.data;
              }
              nodeString += '"' + propertyName + '": ' + ((propertyName !== 'lastmod') ? '"' : '') + propertyValue + ((propertyValueIndex !== 7) ? ((propertyName !== 'lastmod') ? '",' : ',') : '"');
            });
          }
        });
        nodeString += '}';
        nodeObj =JSON.parse(nodeString);
        if (nodeObj.loc === '') {
          temp = nodeObj.lastmod;
          delete nodeObj['loc'];
          delete nodeObj['changefreq'];
          delete nodeObj['priority'];
          delete nodeObj['lastmod'];
          nodeObj.domain = serverUrl;
          nodeObj.lastmod = temp;
          nodeObj.filetype = ['html','js','css','jpg','gif','png','svg','woff','ttf','eot'];
          sitemapJson = nodeObj;
        } else {
          nodesArray.push(nodeObj);
        }
      }
    });
    sitemapJson.pages = nodesArray;
  }
  return sitemapJson;
}

function readData(serverUrl, cb) {
  fs.readFile(path.join('dist', 'sitemap.xml'), 'utf8', (err, data) => {
    let parser = new DOMParser(),
      xml = parser.parseFromString(data, 'text/xml');
    cb(xmlToJson(serverUrl, xml));
  });
}

module.exports = function (serverUrl, cb) {
  readData(serverUrl, (data) => {
    var sitemapJson = JSON.stringify(data, null, 4);
    fs.writeFile(path.join('dist', 'sitemap.json'), sitemapJson);
    cb();
  });
};
