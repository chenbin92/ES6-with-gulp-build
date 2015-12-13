'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import notify from 'gulp-notify';
import browserSync from 'browser-sync';

// browserify
import browserify from 'browserify';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import babelify from 'babelify';

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

// set browserify task
gulp.task('browserify',()=> {
    browserify({
        entries: ['src/js/main.js','src/js/foo.js'],
        debug: true,
    })
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({ message: 'browserify task complete' }));
})

gulp.task('default', ['sass','babel','serve','browserify']);

gulp.task('watch', () => {
  gulp.watch('src/sass/app.scss',['sass']);
  gulp.watch('src/app.js', ['babel']);
  gulp.watch('src/js/*.js', ['browserify']);
})
