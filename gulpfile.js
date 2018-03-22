
// Include gulp
const gulp = require('gulp');

// Include Our Plugins
const watch = require('gulp-watch');
const mocha = require('gulp-mocha');
const nodemon = require('gulp-nodemon');
const reload = require('browser-sync').create().reload;


// Watch  for file changes
gulp.task('watch', () => {
  gulp.watch('public/css/**', ['sass']);
  gulp.watch(
    ['public/css/common.scss, public/css/views/articles.scss'],
    ['sass']
  );
  gulp.watch('public/views/**').on('change', reload);

  // watching for changes in the js files.
  gulp.watch(['public/js/**', 'app/**/*.js'], ['jshint']).on('change', reload);

  gulp.watch('app/views/**').on('change', reload);

  gulp.watch(['test/**'], ['mocha']);
});

gulp.task('develop', () => {
  const stream = nodemon({
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
  stream.on('restart', () => {
    console.log('App restarted');
  })
    .on('crash', () => {
      console.error('Application has crashed!');
      stream.emit('restart', 10);
    });
});

// gulp.task('test', () =>
//   gulp.src(['test/**/*.js'], { read: false })
//     .pipe(mocha({ reporter: 'spec', exit: true })));
// gulp.task('test', ['mocha']);

gulp.task('test', () =>
  gulp.src(['test/**/*.js'])
    .pipe(mocha({ reporter: 'list', exit: true }))
    .on('error', console.error));

gulp.task('default', ['develop', 'watch']);
