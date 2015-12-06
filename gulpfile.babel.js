'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import notify from 'gulp-notify';
import browserSync from 'browser-sync';

var reload = browserSync.reload;

gulp.task('sass', () => {
  gulp.src('src/sass/app.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(notify({ message: 'sass task complete'}));
})

gulp.task('babel',() => {
  gulp.src('src/app.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'babel task complete' }));
})

gulp.task('js-watch', ['babel'], browserSync.reload);

// The static server
gulp.task('serve', ['sass','babel'], () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch('src/sass/app.scss', ['sass']);
    gulp.watch("src/*.js", ['js-watch']);
});


gulp.task('default', ['sass','babel','serve']);

gulp.task('watch', () => {
  gulp.watch('src/sass/app.scss',['sass']);
  gulp.watch('src/app.js', ['babel']);
})
