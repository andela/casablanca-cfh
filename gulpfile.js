import gulp from 'gulp';
import mocha from 'gulp-mocha';
import nodemon from 'gulp-nodemon';
import browserSync from 'browser-sync';
import bower from 'gulp-bower';
import sass from 'gulp-sass';
import eslint from 'gulp-eslint';
import sourcemaps from 'gulp-sourcemaps';

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
  gulp.watch(['test/**'], ['mochaTest']);
});

// Nodemon task
gulp.task('nodemon', () => {
  nodemon({
    script: 'server.js',
    ext: 'js',
    ignore: ['README.md', 'node_modules/**', '.DS_Store'],
    watch: ['app', 'config'],
    env: {
      PORT: 3000
    }
  });
});

// Develop task
gulp.task('develop', () => {
  nodemon({
    script: 'server.js',
    ext: 'js',
    ignore: ['README.md', 'node_modules/**', '.DS_Store'],
    watch: ['app', 'config'],
    env: { PORT: 3000 },
    delay: 1,
    exec: 'node --inspect',
    cwd: __dirname,
    args: []
  });
});

gulp.task('install', ['bower']);

// Bower task
gulp.task('bower', () => {
  bower().pipe(gulp.dest('./bower_components'));
});

gulp.task('bootstrap', () => {
  gulp.src('bower_components/bootstrap/**/*')
    .pipe(gulp.dest('public/lib/bootstrap/dist'));
});

gulp.task('jquery', () => {
  gulp.src('bower_components/jquery/**/*')
    .pipe(gulp.dest('public/lib/jquery'));
});

gulp.task('underscore', () => {
  gulp.src('bower_components/underscore/**/*')
    .pipe(gulp.dest('public/lib/underscore'));
});

gulp.task('angularUtils', () => {
  gulp.src('bower_components/angular-ui-utils/modules/route/route.js')
    .pipe(gulp.dest('public/lib/angular-ui-utils/modules'));
});

gulp.task('angular-bootstrap', () => {
  gulp.src('bower_components/angular-bootstrap/**/*')
    .pipe(gulp.dest('public/lib/angular-bootstrap'));
});

// Move Bower Components to lib folder
gulp.task('moveBowerComponents', ['bootstrap',
  'jquery',
  'underscore',
  'angularUtils',
  'angular-bootstrap']);

// Lint task
gulp.task('lint', () => gulp.src([
  'gulpfile.js',
  'public/js/**/*.js',
  'test/**/*.js',
  'app/**/*.js'])
  .pipe(eslint()));

// Sass task
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
    }));
});

gulp.task('test', ['mochaTest']);

gulp.task('build', ['saas', 'moveBowerComponents']);

// Default task
gulp.task('default', ['develop', 'watch', 'bower', 'moveBowerComponents', 'lint', 'sass', 'install']);
