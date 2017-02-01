'use strict';

const minimist = require('minimist'),
  _ = require('lodash'),
  path = require('path'),
  knownOptions = {
    string: ['env', 'serverUrl', 'authUrl'],
    default: {
      env: 'local'
    }
  };

let options = null;

function readOptions() {
  if (!options) {
    options = minimist(process.argv.slice(2), knownOptions);
    options = _.assign({}, require(path.join('..', 'profiles', options.env + '.json')), options);
  }
  return options;
}

module.exports = {
  getEnv: () => {
    return readOptions().env;
  },

  isLocal: () => {
    return this.getEvn() === 'local';
  },

  getOptions: () => {
    return readOptions();
  }
};
