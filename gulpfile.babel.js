import cprocess from 'child_process'
import del from 'del'
import karma from 'karma'
import merge from 'merge2'
import gulp from 'gulp';
import sequence from 'gulp-sequence'
import ts from 'gulp-typescript'

let tsProject = ts.createProject('tsconfig.json', {
  typescript: require('typescript'),
});

let config = {
  src: '{src,test,typings}',

  dest: 'dist',

  bundle: 'dist/firepipes.js',
}

// Clean

gulp.task('clean', done => del(config.dest, done));

// Build

gulp.task('build.ts', () => {
  let tsResult = gulp.src(`${config.src}/**/*.ts`).pipe(ts(tsProject));

  return merge([
    tsResult.dts.pipe(gulp.dest(config.dest)),
    tsResult.js.pipe(gulp.dest(config.dest)),
  ]);
})

gulp.task('build', (done) => sequence('clean', ['build.ts'], done));

// Publish

import Builder from 'systemjs-builder'

gulp.task('publish.bundle', ['build'], (done) => {
  let builder = new Builder(`${__dirname}/dist/src`, {
    defaultJSExtensions: true,

    meta: {
      'angular2*': {
        build: false,
      },

      'firebase': {
        build: false,
      },
    },
  });

  builder.bundle('firepipes.js', config.bundle).catch(console.log.bind(console)).finally(() => done());
});

gulp.task('publish', sequence('publish.bundle'));

// Watch

gulp.task('watch.ts', () =>
  gulp.watch(`${config.src}/**/*.ts`, ['build.ts'])
);

gulp.task('watch', sequence('build', ['watch.ts']));

// Test

import FirebaseServer from 'firebase-server'

const runKarma = (configFile, done) => {
  cprocess.exec(`node node_modules/.bin/karma run ${configFile}`, (errors, stdout) => done());
}

gulp.task('!test.unit/firebase-server', (done) => {
  new FirebaseServer(5000, 'test.firebaseio.com');
  done();
});

gulp.task('!test.unit/karma-server', (done) => {
  let server = new karma.Server({ configFile: `${__dirname}/karma.conf.js`, reporters: 'dots' });
  var serverStarted = false;

  server.on('run_complete', () => {
    if (!serverStarted) {
      serverStarted = true;
      done();
    }
  });
  server.start();
});

gulp.task('!test.unit/karma-run', (done) => runKarma('karma.conf.js', done));

gulp.task('test.unit', () => {
  sequence('build', '!test.unit/firebase-server', '!test.unit/karma-server', () => {
    gulp.watch(`${config.src}/**/*`, { ignoreInitial: true }, () => sequence('build', '!test.unit/karma-run')());
  });
});
