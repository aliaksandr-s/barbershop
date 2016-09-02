var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	browserSync = require('browser-sync').create(),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

gulp.task('browser-sync', ['styles'], function() {
	browserSync.init({
		server: {
			baseDir: "."
		},
		notify: false
	});
});

gulp.task('styles', function() {
	return gulp
		.src('sass/*.sass')
		.pipe(sass({
			includePaths: require('node-bourbon').includePaths
		}).on('error', sass.logError))
		.pipe(autoprefixer({browsers: ['last 10 versions'], cascade: false}))
		//.pipe(rename({suffix: '.min', prefix : ''}))
		//.pipe(cleanCSS())
		.pipe(concat('style.css'))
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.stream());
});

gulp.task('minify', function () {
	return gulp
		.src('./css/style.css')
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(cleanCSS())
		.pipe(gulp.dest('./css'))
})

gulp.task('watch', function() {
	gulp.watch('sass/*.sass', ['styles']);
	gulp.watch('pages/*.html').on('change', browserSync.reload);
	gulp.watch('js/*.js').on('change', browserSync.reload);
	gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);
