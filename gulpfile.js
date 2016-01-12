'use strict';

let Builder = require('systemjs-builder');
let connect = require('gulp-connect');
let cprocess = require('child_process');
let del = require('del');
let dotenv = require('dotenv');
let gulp = require('gulp');
let karma = require('karma');
let merge = require('merge2');
let minimist = require('minimist');
let sourcemaps = require('gulp-sourcemaps');
let ts = require('gulp-typescript');

dotenv.load();

let argv = minimist(process.argv);

gulp.task('play', gulp.series(clean, buildJs, startServer, watchJs));

gulp.task('bundle', gulp.series(clean, buildJs, gulp.parallel(bundleJs, bundleJsMin, copyPackageMeta)));

gulp.task('test.unit', gulp.series(clean, buildJs, startKarma, watchJs));

gulp.task('test.e2e', gulp.series(updateWebdriver, runProtractor));

gulp.task('!test.unit/run', gulp.series(runKarma));

gulp.task('!test.e2e/run', gulp.series(gulp.parallel(updateWebdriver, startServer), runProtractor));

// Clean

function clean() {
  return del('dist');
}

// Build

let project = ts.createProject('tsconfig.json', {
  typescript: require('typescript'),
});

function buildJs() {
  let result = gulp.src(['{farel,test,typings}/**/*.ts']).pipe(sourcemaps.init()).pipe(ts(project));

  return merge([
    result.js.pipe(sourcemaps.write()).pipe(gulp.dest('dist')), result.dts.pipe(gulp.dest('dist')),
  ]);
}

function watchJs() {
  gulp.watch('{farel,test,typings}/**/*.ts', buildJs);
}

// Bundle

let builder = new Builder('dist', {
  paths: {
    'farel/*': 'farel/*.js',
  },

  meta: {
    'angular2/*': {
      build: false,
    },

    'rxjs/*': {
      build: false,
    },

    'firebase': {
      build: false,
    },
  },
});

function bundleJs() {
  return builder.bundle('farel/farel', 'dist/farel/bundles/farel.js', { sourceMaps: true });
}

function bundleJsMin() {
  return builder.bundle('farel/farel', 'dist/farel/bundles/farel.min.js', { sourceMaps: true, minify: true });
}

function copyPackageMeta() {
  return gulp.src(['package.json', 'README.md', 'LICENSE']).pipe(gulp.dest('dist/farel'))
}

// Serve

var serverProcess = null;

function startServer(done) {
  connect.server({ port: '8001', root: [__dirname] }); done();
}

// Test

function startKarma(done) {
  let server = new karma.Server({ configFile: `${__dirname}/karma.conf.js`, logLevel: 'error' });

  server.once('run_complete', () => done()).start();
}

function runKarma(done) {
  let browsers = require('./browser-providers').BROWSER_ALIASES[argv.browsers || 'ALL'];

  let server = new karma.Server({ configFile: `${__dirname}/karma.conf.js`, singleRun: true, browsers: browsers }, error => {
    done(); process.exit(error ? 1 : 0);
  });

  server.start();
}

function updateWebdriver(done) {
  cprocess.spawn(`node_modules/.bin/webdriver-manager`, ['update'], { stdio: 'inherit' }).on('close', (error) => {
    done(); error ? process.exit(1) : 0;
  });
}

function runProtractor(done) {
  cprocess.spawn(`node_modules/.bin/protractor`, ['protractor.conf.js'], { stdio: 'inherit' }).on('close', (error) => {
    done(); process.exit(error ? 1 : 0);
  });
}
