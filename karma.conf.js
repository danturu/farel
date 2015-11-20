module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: [
      'jasmine',
    ],

    files: [
      'node_modules/systemjs/dist/system.src.js',
      'test-main.js',
      { pattern: 'node_modules/firebase/**/*.js', included: false, watched: false },
      { pattern: 'dist/**/*.js', included: false, watched: false },
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
