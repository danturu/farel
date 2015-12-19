Error.stackTraceLimit = Infinity;

__karma__.loaded = function() {};

System.config({
  baseURL: '/base/dist',

  paths: {
    'angular2/*': '/base/node_modules/angular2/*.js',
    'rxjs/*': '/base/node_modules/rxjs/*.js',
  },

  map: {
    'firebase': '/base/node_modules/firebase/lib/firebase-web.js',
  },

  defaultJSExtensions: true,

  //packages: {
  //  'farel': {
  //    defaultExtension: 'js'
  //  },

  //  'test': {
  //    defaultExtension: 'js'
  //  },
  //}
});

Promise.all(Object.keys(__karma__.files).filter(isSpecFile).map(importSpecModule)).then(
  function() {
    __karma__.start();
  },

  function(error) {
    __karma__.error(error.stack || error);
  }
);

function isSpecFile(path) {
  var files = [
    'jasmine_matchers.js',
    '_spec.js',
  ];

  return new RegExp(files.join('|') + '$').test(path);
}

function importSpecModule(path) {
  return System.import(path).then(function(module) {
    if (module.hasOwnProperty('main')) {
      module.main(null);
    } else {
      throw new Error('Module ' + path + ' does not implement main() method.');
    }
  });
}
