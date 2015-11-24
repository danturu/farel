module.exports = function(config) {
  config.set({
    frameworks: [
      'jasmine',
    ],

    files: [
      'node_modules/systemjs/dist/system.src.js',
      'test-main.js',
      { pattern: 'node_modules/angular2/bundles/angular2.js', included: false, watched: false },
      { pattern: 'node_modules/firebase/lib/firebase-web.js', included: false, watched: false },
      { pattern: 'dist/**/*.js', included: false, watched: false },
    ],

    exclude: [
      'dist/test/e2e/**',
    ],

    reporters: [
      'progress',
    ],

    browsers: [
      'Chrome',
    ],

    port: 9876,
  });
};
