'use strict';

let gulp = require('gulp');
let babel = require('gulp-babel');
let sass = require('gulp-sass');
let del = require('del');
let jshint = require('gulp-jshint');

var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');

let jsSource = 'src/js/**/*.js';
let styleSource = 'src/scss/**/*.scss';
let hbsSource = 'src/hbs/**/*.hbs';


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

gulp.task('build:hbs', () => {
    gulp.src(hbsSource)
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
        namespace: 'ts.templates',
        noRedeclare: true,
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build:css', () => {
     gulp.src(styleSource)
    .pipe(sass())
    .pipe(gulp.dest('dist'))

});

/*gulp.task('clean', () => {
    del.sync('dist');
});*/

gulp.task('check', () => {
  return gulp.src(jsSource)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


gulp.task('build', ['build:js', 'build:css', 'build:hbs']);
