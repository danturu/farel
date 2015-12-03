import { CUSTOM_LAUNCHERS } from './browser-providers'

export default function(config) {
  config.set({
    files: [
      'node_modules/systemjs/dist/system.js',
      'test-main.js',
      { pattern: 'node_modules/angular2/bundles/angular2.js', included: false, watched: false },
      { pattern: 'node_modules/firebase/lib/firebase-web.js', included: false, watched: false },
      { pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: false, watched: false },
      { pattern: 'dist/**/*.js', included: false, watched: false },
    ],

    exclude: [
      'dist/test/e2e/**',
    ],

    frameworks: [
      'jasmine',
    ],

    reporters: [
      'dots',
      'saucelabs',
    ],

    browsers: [
      'Chrome',
    ],

    customLaunchers: CUSTOM_LAUNCHERS,

    port: 9876,

    concurrency: 3,

    sauceLabs: {
      testName: 'Firepipe Unit Tests',
      startConnect: false,
    },
  });

  if (process.env.TRAVIS) {
    config.sauceLabs.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;
    config.sauceLabs.build = `TRAVIS #${process.env.TRAVIS_BUILD_NUMBER} (${process.env.TRAVIS_BUILD_ID})`;
  }
};
