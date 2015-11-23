Error.stackTraceLimit = Infinity;

__karma__.loaded = function() {};

System.config({
  baseURL: '/base/dist',

  defaultJSExtensions: true,

  paths: {
    'mockfirebase': '/base/node_modules/mockfirebase/browser/mockfirebase.js',
    'angular2/*': '/base/node_modules/angular2/bundles/*.js',
    'src/*': '/base/dist/src/lib/*.js',
  },

  meta: {
    'angular2/*': {
      format: 'register',
    },
  }
});

System.registerDynamic('firebase', ['mockfirebase'], true, (require, exports, module) => {
  module.exports = require('mockfirebase').MockFirebase;
});

function onlySpecFiles(path) {
  return /_spec\.js$/.test(path);
}

function importSpecModule(path) {
  return System.import(path).then(function(module) {
    if (module.hasOwnProperty('main')) {
      module.main();
    } else {
      throw new Error('Module ' + path + ' does not implement main() method.');
    }
  });
}

Promise.all(Object.keys(window.__karma__.files).filter(onlySpecFiles).map(importSpecModule)).then(
  function() {
    __karma__.start();
  },

  function(error) {
    __karma__.error(error.stack || error);
  }
);
