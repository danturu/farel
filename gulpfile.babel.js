import cprocess from 'child_process'
import del from 'del'
import dotenv from 'dotenv'
import gulp from 'gulp';
import karma from 'karma'
import merge from 'merge2'
import minimist from 'minimist'
import connect from 'gulp-connect'
import sequence from 'gulp-sequence'
import sourcemaps from 'gulp-sourcemaps'
import ts from 'gulp-typescript'

dotenv.load();

let argv = minimist(process.argv);

// Clean

gulp.task('clean', done => del('dist', done));

// Build

import Builder from 'systemjs-builder'

let tsProject = ts.createProject('tsconfig.json', {
  typescript: require('typescript'),
});

let bundleConfig = {
  paths: {
    'firepipe/*': 'firepipe/*.js',
  },

  meta: {
    'angular2/angular2': {
      build: false,
    },

    'firebase': {
      build: false,
    },
  },
};

gulp.task('build.src.js', () => {
  let result = gulp.src(['{firepipe,typings}/**/*.ts']).pipe(sourcemaps.init()).pipe(ts(tsProject));

  return merge([
    result.js.pipe(sourcemaps.write()).pipe(gulp.dest('dist')), result.dts.pipe(gulp.dest('dist')),
  ]);
})

gulp.task('build.test.js', () => {
  let result = gulp.src(['{test,typings}/**/*.ts']).pipe(sourcemaps.init()).pipe(ts(tsProject));

  return merge([
    result.js.pipe(sourcemaps.write()).pipe(gulp.dest('dist')), gulp.src('test/**/*.html', { base: '.' }).pipe(gulp.dest('dist'))
  ]);
});

gulp.task('build.js', done =>
  sequence('build.src.js', 'build.test.js', done)
);

gulp.task('build.bundle', () => {
  let builder = new Builder('dist', bundleConfig);

  return builder.bundle('firepipe/firepipe', 'dist/firepipe/bundles/firepipe.js', { sourceMaps: true });
});

gulp.task('build.bundle.min', done => {
  let builder = new Builder('dist', bundleConfig);

  return builder.bundle('firepipe/firepipe', 'dist/firepipe/bundles/firepipe.min.js', { sourceMaps: true, minify: true });
});

gulp.task('build.bundle.sfx', () => {
  let builder = new Builder('dist', bundleConfig);

  return builder.buildStatic('firepipe/firepipe', 'dist/firepipe/bundles/firepipe.sfx.js', { runtime: false, format: 'cjs', sourceMaps: true })
});

gulp.task('build.bundle.sfx.min', () => {
  let builder = new Builder('dist', bundleConfig);

  return builder.buildStatic('firepipe/firepipe', 'dist/firepipe/bundles/firepipe.sfx.min.js', { runtime: false, format: 'cjs', sourceMaps: true, minify: true })
});

gulp.task('build.package', () =>
  gulp.src(['package.json', 'README.md', 'LICENSE']).pipe(gulp.dest('dist/firepipe'))
);

gulp.task('build.release', done => sequence('clean', ['build.js'], [
  'build.bundle',
  'build.bundle.min',
  'build.bundle.sfx',
  'build.bundle.sfx.min',
  'build.package',
], done));

// Watch

gulp.task('watch.js', () =>
  gulp.watch('{firepipe,test,typings}/**/*', ['build.js'])
);

gulp.task('watch.release', () =>
  gulp.watch('{firepipe,test,typings}/**/*', ['build.release'])
);

// Test

import { BROWSER_ALIASES } from './browser-providers'

gulp.task('!test.unit/karma-server', done => {
  let server = new karma.Server({ configFile: `${__dirname}/karma.conf.js` });

  server.once('run_complete', () => {
    done();
  });

  server.start();
});

gulp.task('!test.unit/karma-run', done => {
  cprocess.exec(`node_modules/.bin/karma run karma.conf.js`, () => done());
});

gulp.task('!test.unit/webdriver-update', done => {
  cprocess.spawn(`node_modules/.bin/webdriver-manager`, ['update'], { stdio: 'inherit' }).on('close', (error) => {
    done(); error ? process.exit(1) : 0;
  });
});

gulp.task('!test.unit/protractor-run', done => {
  cprocess.spawn(`node_modules/.bin/protractor`, ['protractor.conf.js'], { stdio: 'inherit' }).on('close', (error) => {
    done(); error ? process.exit(1) : 0;
  });
});

gulp.task('!test.unit/firebase-server', () => {
  new require('firebase-server')(5000, 'test.firebaseio.com');
});

gulp.task('test.unit', (done) => {
  sequence('clean', 'build.js', '!test.unit/karma-server', () => {
    gulp.watch(`{firepipe,test,typings}/**/*`, { ignoreInitial: true }, () => sequence('build.js', '!test.unit/karma-run')());
  });
});

gulp.task('!test.unit/run', done => {
  let server = new karma.Server({ configFile: `${__dirname}/karma.conf.js`, singleRun: true, browsers: BROWSER_ALIASES[argv.browsers || 'ALL'] }, error => {
    done(); process.exit(error ? 1 : 0);
  });

  server.start();
});

gulp.task('test.e2e', done => {
  sequence('!test.unit/webdriver-update', '!test.unit/protractor-run', done);
});

gulp.task('!test.e2e/run', done => {
  sequence('serve.e2e', '!test.unit/webdriver-update', '!test.unit/protractor-run', () => {
    done(); connect.serverClose();
  });
});

gulp.task('!test/prepare', ['build.release']);

// Serve

gulp.task('serve.e2e', () => {
  connect.server({ port: '8001', root: [__dirname] });
});

gulp.task('serve', (done) => {
  sequence(['build.release', 'watch.release'], 'serve.e2e', done);
});
