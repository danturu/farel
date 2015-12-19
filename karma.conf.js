'use strict';

let CUSTOM_LAUNCHERS = require('./browser-providers').CUSTOM_LAUNCHERS;

module.exports = function(config) {
  config.set({
    files: [
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/systemjs/dist/system.js',
      'test-main.js',
      { pattern: 'node_modules/angular2/**', included: false, watched: false, served: true },
      { pattern: 'node_modules/firebase/lib/**', included: false, watched: false },
      { pattern: 'node_modules/rxjs/**', included: false, watched: false },
      { pattern: 'node_modules/systemjs/dist/**', included: false, watched: false },
      { pattern: 'dist/**', included: false, watched: true },
    ],

    exclude: [
      'node_modules/angular2/**/*_spec.js',
      'dist/test/e2e/**',
    ],

    frameworks: [
      'jasmine',
    ],

    reporters: [
      'dots',
    ],

    browsers: [
      'Chrome',
    ],

    autoWatchBatchDelay: 1000,

    customLaunchers: CUSTOM_LAUNCHERS,

    port: 9876,

    concurrency: 5,

    sauceLabs: {
      testName: 'Farel Unit Tests',
      startConnect: false,
    },
  });

  if (process.env.TRAVIS) {
    config.sauceLabs.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;
    config.sauceLabs.build = `TRAVIS #${process.env.TRAVIS_BUILD_NUMBER} (${process.env.TRAVIS_BUILD_ID})`;
  }
};
