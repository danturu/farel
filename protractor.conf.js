'use strict';

let config = exports.config = {
  baseUrl: 'http://localhost:8001',

  framework: 'jasmine2',

  useAllAngular2AppRoots: true,

  specs: [
    './dist/test/e2e/**/*_spec.js'
  ],

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 60000,
  },

  multiCapabilities: [{
    browserName: 'chrome',
  }],
}

if (process.env.TRAVIS) {
  Object.assign(config, { sauceUser: process.env.SAUCE_USERNAME, sauceKey: process.env.SAUCE_ACCESS_KEY });

  let build = `TRAVIS #${process.env.TRAVIS_BUILD_NUMBER} (${process.env.TRAVIS_BUILD_ID})`;

  config.multiCapabilities.forEach(caps => {
    Object.assign(caps, { 'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER, name: 'Farel Protractor Tests', build: build });
  });
}
