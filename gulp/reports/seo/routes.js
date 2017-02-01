'use strict';

var fs = require('fs'),
  system = require('system'),
  async = require('async'),
  _ = require('lodash'),
  args = system.args,
  domain = args[1],
  output = './report/seo/report.json',
  webpage = require('webpage'),
  page = webpage.create();

function getLinksData() {
  return page.evaluate(function () {
    var inLinks = [],
      outLinks = [],
      socialLinks = [],
      domainLinks = [],
      links = document.querySelectorAll('a'),
      linksArray = [];
    for (link in links) {
      if (linksArray.indexOf(link) != 0) {
        linksArray.push(link.href);
      }
    }
    for (link in linksArray) {
      if (link !== '#' && link !== '') {
        if (link.charAt(0) === '/' || link.indexOf("t-mobile.com") > -1 || link.indexOf("localhost") > -1) {
          inLinks.push(link);
        } else {
          outLinks.push(link);
        }
      }
    }
    for (link in outLinks) {
      if (link.indexOf("instagram.com") > -1 || link.indexOf("facebook.com") > -1 || link.indexOf("twitter.com") > -1 || link.indexOf("plus.google.com") > -1) {
        socialLinks.push(link);
      }
    }
    for (link in inLinks) {
      if (link.indexOf("t-mobile.com") > -1) {
        domainLinks.push(link);
      }
    }
    return {
      outlinks_count: outLinks.length,
      inlinks_count: inLinks.length,
      domain_links: domainLinks.length,
      social_links: socialLinks.length,
      page_level_links: (inLinks.length) - (domainLinks.length + socialLinks.length)
    };
  });
}

function getPageData() {
  return page.evaluate(function () {
    var wordCount = document.body.innerText.split(/\s/).filter(function (txt) { return /\S/.test(txt) }).length
    return {
      title: document.title,
      page_word_count: wordCount,
    }
  });
}

function getMetas() {
  return page.evaluate(function () {
    var result = {
        meta_charset: '',
        meta_description: '',
        meta_robots: ''
      },
      a,
      metaTags = document.querySelectorAll('head meta');
    for (a = 0; a < metaTags.length; a++) {
      if (metaTags[a].getAttribute('charset')) {
        result.meta_charset = metaTags[a].getAttribute('charset');
      }
      if (metaTags[a].getAttribute('name') === 'description') {
        if (metaTags[a].getAttribute('content') && metaTags[a].getAttribute('content') !== '') {
          result.meta_description = metaTags[a].getAttribute('content');
        }
      }
      if (metaTags[a].getAttribute('name') === 'robots') {
        if (metaTags[a].getAttribute('content') && metaTags[a].getAttribute('content') !== '') {
          result.meta_robots = metaTags[a].getAttribute('content');
        }
      }
    }
    return result;
  });
}

function getHeadings() {
  return page.evaluate(function () {
    var getAllHeadingList = document.querySelectorAll('h1,h2,h3,h4,h5,h6');
    var getAllHeadingText = [];
    var arrAllHeadingsWithTagsCount = [];
    for (var i = 0; i < getAllHeadingList.length; i++) {
      getAllHeadingText.push(getAllHeadingList[i].tagName + ">>" + getAllHeadingList[i].innerText);
    }
    var headingCountIndex = 1;
    if (getAllHeadingText.length > 0) {
      for (currentArrElem in getAllHeadingText) {
        var currentTagName = currentArrElem.split(">>")[0];
        var currentTagValue = currentArrElem.split(">>")[1];
        if (currentTagValue !== "‘’" && currentTagValue !== "") {
          var currentIndex = currentTagName;
          if (previousIndex !== currentIndex) {
            headingCountIndex = 1;
          }
          arrAllHeadingsWithTagsCount.push(currentTagName + " - " + (headingCountIndex) + "  " + currentTagValue + ", ");
          var previousIndex = currentTagName;
          headingCountIndex++;
        }
      }
    }
    return {
      heading_values: arrAllHeadingsWithTagsCount
    };
  });
}

function getPageWeight() {
  var getPageWeight = page.evaluate(function () {
    return document.querySelector("html").innerHTML.length;
  });
  var totalPageLength = getPageWeight;
  var pageWeightInKB = getPageWeight / 1024;
  return {
    page_size: pageWeightInKB + ' KB'
  }
}

function getLevelPage(url) {
  var formattedUrl = url.replace(/\/\/+/g, "");
  if (formattedUrl.charAt(formattedUrl.length - 1) === '/') {
    formattedUrl = formattedUrl.substr(0, formattedUrl.length - 1);
  }
  var countLevel = formattedUrl.split('/').length - 1;
  return countLevel;
}

function run() {
  var states = _.reject(require('../../../report/states.json'), 'abstract', true);

  async.mapSeries(states, function (state, callback) {
    var pageData = {
      url: domain + state.url,
      name: state.url,
      page_level: getLevelPage(domain + state.url),
      page_content: 'text/html'
    };

    page.open(pageData.url, function (status) {
      pageData.page_status = status;
      if (status === 'success') {
        _.assign(pageData, getPageData());
        _.assign(pageData, getLinksData());
        _.assign(pageData, getMetas());
        _.assign(pageData, getHeadings());
        _.assign(pageData, getPageWeight());
      }
      callback(null, pageData);
    });

  }, function (err, pages) {
    var jsonReport = JSON.stringify({
      pages: _.orderBy(pages, 'url')
    }, null, 4);
    fs.write(output, jsonReport, 'w');
    phantom.exit();
  });
}

run();
