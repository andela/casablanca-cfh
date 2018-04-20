import gulp from 'gulp';
import mocha from 'gulp-mocha';
import nodemon from 'gulp-nodemon';
import babel from 'gulp-babel';
import browserSync from 'browser-sync';
import bower from 'gulp-bower';
import sass from 'gulp-sass';
import eslint from 'gulp-eslint';
import sourcemaps from 'gulp-sourcemaps';
import exit from 'gulp-exit';

// Lint task
gulp.task('lint', () => gulp.src([
  'gulpfile.js',
  'public/js/**/*.js',
  'test/**/*.js',
  'app/**/*.js'])
  .pipe(eslint()));

// set up build folder
// move none js files to build

gulp.task('clone-json-files', () => {
  gulp.src('config/env/*.js')
    .pipe(gulp.dest('build/config/env'));
});

// move css, image etc to build/public
gulp.task('clone-public-noneJs-files', () => {
  gulp.src(['public/**/*', '!public/js/**'])
    .pipe(gulp.dest('build/public'));
});

// clone jade files in app folder
gulp.task('clone-app-jade-files', () => {
  gulp.src('app/views/**/*')
    .pipe(gulp.dest('build/app/views'));
});

// Bower task
gulp.task('bower', () => {
  bower().pipe(gulp.dest('./bower_components'));
});

gulp.task('jquery', () => {
  gulp.src('bower_components/jquery/**/*')
    .pipe(gulp.dest('./build/public/lib/jquery'));
});

gulp.task('emojioneCSS', () => {
  gulp.src('bower_components/emojione/extras/css/emojione.css')
    .pipe(gulp.dest('./build/public/lib/emojionearea'));
});

gulp.task('emojioneJS', () => {
  gulp.src('bower_components/emojione/lib/js/emojione.js')
    .pipe(gulp.dest('./build/public/lib/emojionearea'));
});

gulp.task('boostrap', () => {
  gulp.src('bower_components/bootstrap/**/*')
    .pipe(gulp.dest('public/lib/bootstrap'));
});

gulp.task('underscore', () => {
  gulp.src('bower_components/underscore/**/*')
    .pipe(gulp.dest('./build/public/lib/underscore'));
});

gulp.task('emojionearea', () => {
  gulp.src('bower_components/emojionearea/dist/*')
    .pipe(gulp.dest('./build/public/lib/emojionearea'));
});

gulp.task('emojioneJS', () => {
  gulp.src('bower_components/emojione/lib/js/emojione.js')
    .pipe(gulp.dest('./build/public/lib/emojionearea'));
});

gulp.task('emojioneCSS', () => {
  gulp.src('bower_components/emojione/extras/css/emojione.css')
    .pipe(gulp.dest('./build/public/lib/emojionearea'));
});

gulp.task('angularUtils', () => {
  gulp.src('bower_components/angular-ui-utils/modules/route/route.js')
    .pipe(gulp.dest('./build/public/lib/angular-ui-utils/modules'));
});

// Move Bower Components to lib folder
gulp.task('moveBowerComponents', [
  'jquery',
  'underscore',
  'angularUtils',
  'emojionearea',
  'emojioneCSS',
  'emojioneJS'
]);

// Watch  for file changes
gulp.task('watch', () => {
  gulp.watch('public/css/**', ['sass']);
  gulp.watch(
    ['public/css/common.scss, public/css/views/articles.scss'],
    ['sass']
  );
  gulp.watch('public/views/**', browserSync.reload());
  gulp.watch(['public/js/**', 'app/**/*.js'], ['lint'], browserSync.reload());
  gulp.watch('app/views/**', browserSync.reload());
});

// set up css pre-processing with sass
gulp.task('sass', () => gulp
  .src('./css/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({ style: 'expanded' }).on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./public/css/')));

// Test task
gulp.task('mochaTest', () => {
  gulp.src(['test/**/*.js'])
    .pipe(mocha({
      reporter: 'spec',
      compilers: 'babel-core/register',
      exit: true
    }))
    .pipe(exit());
});

// configure es6 transpiler with babel
gulp.task('babel', () =>
  gulp.src(['./**/*.js',
    '!build/**',
    '!bower_components/**/*',
    '!node_modules/**',
    '!gulpfile.babel.js'])
    .pipe(babel())
    .pipe(gulp.dest('./build')));

gulp.task('develop', () => {
  nodemon({
    script: 'build/server.js',
    ext: 'js, jade',
    ignore: ['README.md', 'node_modules/**', '.DS_Store'],
    watch: ['app', 'config'],
    env: {
      PORT: 3000,
      NODE_ENV: 'development'
    },
    tasks: ['rebuild']
  });
});

gulp.task('test', ['mochaTest']);

gulp.task('install', ['bower']);
gulp.task('clone-files', ['clone-json-files',
  'clone-public-noneJs-files',
  'clone-app-jade-files']);
gulp.task('build', ['moveBowerComponents', 'clone-files', 'babel']);
gulp.task('rebuild', ['babel', 'clone-files']);
gulp.task('default', ['develop', 'watch']);
