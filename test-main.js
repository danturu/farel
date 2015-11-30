Error.stackTraceLimit = Infinity;

__karma__.loaded = function() {};

System.config({
  baseURL: '/base/dist',

  paths: {
    'angular2/angular2': '/base/node_modules/angular2/bundles/angular2.js',
    'firebase': '/base/node_modules/firebase/lib/firebase-web.js',
  },

  meta: {
    'angular2/angular2': {
      format: 'register',
    },

    'firebase': {
      format: 'cjs',
    }
  },

  packages: {
    'firepipes': {
      defaultExtension: 'js'
    },

    'test': {
      defaultExtension: 'js'
    },
  }
});

var FIREBASE_URL = 'http://127.0.1:5000/';

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
    'dinosaur_facts.js',
    '_spec.js',
  ];

  return new RegExp(files.join('|') + '$').test(path);
}

function importSpecModule(path) {
  return System.import(path).then(function(module) {
    if (module.hasOwnProperty('main')) {
      module.main(FIREBASE_URL);
    } else {
      throw new Error('Module ' + path + ' does not implement main() method.');
    }
  });
}
