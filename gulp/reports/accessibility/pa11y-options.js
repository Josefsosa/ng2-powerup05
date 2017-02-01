'use strict';

let clc = require('cli-color');

module.exports = {
  log: {
    debug: console.log.bind(console),
    error: console.error.bind(console),
    info: console.info.bind(console)
  },
  beforeScript: (page, options, next) => {
    let waitUntil = (condition, retries, waitOver) => {
      page.evaluate(condition, (error, result) => {
        if (result || retries < 1) {
          if (retries < 1) {
            console.log(clc.red('End of retries looking for page ready'));
          }
          waitOver();
        } else {
          retries -= 1;
          setTimeout(() => {
            waitUntil(condition, retries, waitOver);
          }, 100);
        }
      });
    };

    page.evaluate(() => {}, () => {
      waitUntil(function() {
        return window.objStatesGenerator !== undefined;
      }, 20, next);
    });
  }
};
