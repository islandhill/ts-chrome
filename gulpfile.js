'use strict';

let gulp = require('gulp');
let babel = require('gulp-babel');
let sass = require('gulp-sass');
let del = require('del');
let jshint = require('gulp-jshint');

let jsSource = 'src/js/**/*.js';
let styleSource = 'src/scss/**/*.scss';


gulp.task('default', () => {
  console.log("Gulp is working! Now type the actual command you'd like to execute.");
});

//run build before watch so it's starting with the latest
gulp.task('watch', ['build'], () => {
  gulp.watch(jsSource, ['build-js']);
  gulp.watch(styleSource, ['build-css']);
});

gulp.task('build:js', () => {
	return gulp.src(jsSource)
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('build:css', () => {
  return gulp.src(styleSource)
    .pipe(sass())
    .pipe(gulp.dest('dist'))

});

gulp.task('clean', () => {
  return del.sync('dist');
});

gulp.task('check', () => {
  return gulp.src(jsSource)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


gulp.task('build', ['build:js', 'build:css']);
