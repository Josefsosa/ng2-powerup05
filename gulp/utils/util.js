var utils = module.exports = {};
const fs = require('fs');

/**
 * Validate if channel exists in our deployment
 * @param channel
 * @returns {boolean}
 */
utils.validateChannel = function (channel) {
  if (channel === 'web' || channel === 'care' || channel === 'redesk' || channel === 'retail') {
    return true;
  } else {
    return false;
  }
};

/**
 * Empty file
 * @param url
 */
utils.emptyFile = function (url) {
  fs.writeFileSync(url, '');
};

utils.capitalizeFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
